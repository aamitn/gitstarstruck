'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaGithub, FaStar } from 'react-icons/fa';
import { FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6';
import { ImSpinner8 } from 'react-icons/im';
import { motion, AnimatePresence } from 'motion/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function RepoSubmissionForm() {
  const { data: session } = useSession();
  const [repoUrl, setRepoUrl] = useState('');
  const [action, setAction] = useState<'star' | 'unstar'>('star');
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showStars, setShowStars] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/submit-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, action }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setSuccessMessage(
          data.message || 'Repository action completed successfully!'
        );
        setRepoUrl('');
        if (action === 'star') {
          setShowStars(true);
          setTimeout(() => setShowStars(false), 3000);
        }
      } else {
        setStatus('error');
        setErrorMessage(
          data.error || 'Something went wrong with your request.'
        );
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error or unexpected failure occurred.');
    }
  };

  // Generate stars for animation
  const starAnimations = Array(10)
    .fill(0)
    .map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0.5],
          x: Math.random() * 200 - 100,
          y: Math.random() * -200 - 50,
          rotate: Math.random() * 360,
        }}
        transition={{
          duration: 1.5 + Math.random(),
          ease: 'easeOut',
          times: [0, 0.3, 1],
        }}
        className="absolute top-1/2 left-1/2 pointer-events-none"
      >
        <FaStar className="text-yellow-400" size={20 + Math.random() * 15} />
      </motion.div>
    ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 relative overflow-hidden">
        <CardHeader className="space-y-1 bg-muted/40 dark:bg-muted/60 rounded-t-lg">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.7 }}
            >
              <FaGithub className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <CardTitle className="text-xl text-blue-800 dark:text-blue-300">
              GitStarStruck
            </CardTitle>
          </motion.div>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            Unlock the 'StarStruck' Badge
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="repo-url" className="text-sm font-medium">
                Repository URL
              </Label>
              <Input
                id="repo-url"
                type="url"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full focus:ring-2 focus:ring-blue-500"
                required
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="repo-action" className="text-sm font-medium">
                Action
              </Label>
              <Select
                value={action}
                onValueChange={(value) => setAction(value as 'star' | 'unstar')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="star">Star</SelectItem>
                  <SelectItem value="unstar">Unstar</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
                    <FaCircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle className="text-green-800 dark:text-green-300">
                      Success
                    </AlertTitle>
                    <AlertDescription className="text-green-600 dark:text-green-200">
                      {successMessage}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700">
                    <FaCircleExclamation className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertTitle className="text-red-800 dark:text-red-300">
                      Error
                    </AlertTitle>
                    <AlertDescription className="text-red-600 dark:text-red-200">
                      {errorMessage}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </CardContent>

        <CardFooter className="bg-gray-50 dark:bg-gray-800 rounded-b-lg">
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={status === 'submitting' || !repoUrl}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 font-medium"
            >
              {status === 'submitting' ? (
                <>
                  <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : action === 'star' ? (
                'Star Repository'
              ) : (
                'Unstar Repository'
              )}
            </Button>
          </motion.div>
        </CardFooter>

        {/* Star animation container */}
        <AnimatePresence>
          {showStars && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {starAnimations}
            </div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
