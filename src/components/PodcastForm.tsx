
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Loader2 } from 'lucide-react';

interface VoiceOption {
  id: string;
  name: string;
}

interface PodcastFormProps {
  onSubmit: (topic: string, voice: string) => Promise<void>;
  isLoading: boolean;
}

const PodcastForm: React.FC<PodcastFormProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('EXAVITQu4vr4xnSDxMaL'); // Default to 'Sarah'

  const voices: VoiceOption[] = [
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
    { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie" },
    { id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum" },
    { id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte" },
    { id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    await onSubmit(topic, selectedVoice);
  };

  return (
    <Card className="bg-podcast-gray border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-podcast-purple" />
          <span>Generate Your Podcast</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium text-podcast-lightGray">
              Topic or Sentence
            </label>
            <Textarea
              id="topic"
              placeholder="Enter a topic or sentence for your podcast..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-podcast-dark border-podcast-gray text-white"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="voice" className="text-sm font-medium text-podcast-lightGray">
              Choose a Voice
            </label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger className="bg-podcast-dark border-podcast-gray text-white">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent className="bg-podcast-dark border-podcast-gray text-white">
                {voices.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-podcast-purple hover:bg-opacity-80"
            disabled={isLoading || !topic.trim()}
          >
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              'Generate Podcast'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PodcastForm;
