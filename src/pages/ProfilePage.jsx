import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Key, } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge/badge';
import { useSelector } from 'react-redux';


export default function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { authUser } = useSelector((state) => state);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className=" dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
          <CardHeader className="pb-0 pt-6 px-6 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
              <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 relative">
                <AvatarImage src={authUser.avatar || '/placeholder.svg'} alt={authUser.name} />
                <AvatarFallback>{authUser.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 text-center"
            >
              <h2 className="text-2xl font-bold tracking-tight capitalize">{authUser.name}</h2>
              <Badge variant="secondary" className="mt-2">

              </Badge>
            </motion.div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: authUser.email },
                { icon: Key, label: 'ID', value: authUser.id },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="flex items-center p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                      <item.icon className="h-5 w-5 text-slate-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
