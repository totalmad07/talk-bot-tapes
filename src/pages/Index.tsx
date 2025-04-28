
import React, { useState } from 'react';
import PodcastForm from '@/components/PodcastForm';
import ScriptDisplay from '@/components/ScriptDisplay';
import AudioPlayer from '@/components/AudioPlayer';
import { generateScript } from '@/utils/openai';
import { generateSpeech } from '@/utils/elevenlabs';
import { useToast } from '@/components/ui/use-toast';
import { Headphones, Sparkles } from 'lucide-react';

const Index = () => {
  const [podcastScript, setPodcastScript] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [topicTitle, setTopicTitle] = useState<string>('');
  const { toast } = useToast();

  const handleGeneratePodcast = async (topic: string, voiceId: string) => {
    try {
      // Step 1: Generate the script
      setIsGeneratingScript(true);
      setTopicTitle(topic);
      setPodcastScript(null);
      setAudioUrl(null);
      
      const script = await generateScript(topic);
      setPodcastScript(script);
      setIsGeneratingScript(false);
      
      // Step 2: Generate the audio
      setIsGeneratingAudio(true);
      const audioUrl = await generateSpeech(script, voiceId);
      setAudioUrl(audioUrl);
      setIsGeneratingAudio(false);
      
      toast({
        title: 'Podcast generated!',
        description: 'Your podcast is ready to play.',
      });
    } catch (error) {
      setIsGeneratingScript(false);
      setIsGeneratingAudio(false);
      console.error('Error generating podcast:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate podcast. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-podcast-dark text-white">
      <header className="py-8 px-6 md:px-12">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <div className="bg-podcast-purple p-2 rounded-md">
              <Headphones className="h-6 w-6" />
            </div>
            <span className="bg-clip-text text-transparent bg-podcast-gradient">Talk-Bot-Tapes</span>
          </h1>
          <p className="mt-2 text-podcast-lightGray">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-podcast-pink" /> 
              AI-Generated Podcasts on Any Topic
            </span>
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <PodcastForm 
              onSubmit={handleGeneratePodcast} 
              isLoading={isGeneratingScript || isGeneratingAudio} 
            />
            <AudioPlayer 
              audioUrl={audioUrl} 
              isLoading={isGeneratingAudio}
              title={topicTitle}
            />
          </div>
          
          <div>
            <ScriptDisplay 
              script={podcastScript} 
              isLoading={isGeneratingScript} 
            />
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-podcast-gray">
        <div className="container mx-auto px-6 md:px-12 text-center text-podcast-lightGray text-sm">
          <p>© 2025 Talk-Bot-Tapes • AI-Generated Podcasts</p>
          <p className="mt-1 text-xs">
            Powered by ElevenLabs Text-to-Speech Technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
