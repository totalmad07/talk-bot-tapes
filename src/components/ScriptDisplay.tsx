
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText } from 'lucide-react';

interface ScriptDisplayProps {
  script: string | null;
  isLoading: boolean;
}

const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ script, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="bg-podcast-gray border-none shadow-lg h-[300px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-podcast-blue" />
            <span>Podcast Script</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[220px]">
          <div className="text-podcast-lightGray text-center animate-pulse">
            Generating your podcast script...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!script) {
    return (
      <Card className="bg-podcast-gray border-none shadow-lg h-[300px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-podcast-blue" />
            <span>Podcast Script</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[220px]">
          <div className="text-podcast-lightGray text-center">
            Your podcast script will appear here
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-podcast-gray border-none shadow-lg h-[300px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-podcast-blue" />
          <span>Podcast Script</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px] pr-4">
          <div className="text-white whitespace-pre-line">
            {script}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ScriptDisplay;
