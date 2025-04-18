
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Settings, Plus, GridIcon, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import VideoFeed from '@/components/VideoFeed';
import { videoFeeds } from '@/data/mockData';

const Cameras = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCameras = videoFeeds.filter(camera => 
    camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    camera.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Camera Management</h1>
              <p className="text-security-foreground/70">View and manage security cameras</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Settings size={16} />
                <span>Settings</span>
              </Button>
              <Button className="gap-2">
                <Plus size={16} />
                <span>Add Camera</span>
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Camera Network</CardTitle>
              <CardDescription>Monitor your security cameras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Camera className="absolute left-2.5 top-2.5 h-4 w-4 text-security-foreground/50" />
                  <Input 
                    type="search" 
                    placeholder="Search cameras..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <div className="flex items-center border border-security-border rounded-md overflow-hidden">
                    <Button 
                      variant="ghost" 
                      className={`h-9 px-3 rounded-none ${viewMode === 'grid' ? 'bg-security-muted' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <GridIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`h-9 px-3 rounded-none ${viewMode === 'list' ? 'bg-security-muted' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCameras.map(camera => (
                    <VideoFeed 
                      key={camera.id}
                      id={camera.id}
                      name={camera.name}
                      source={camera.source}
                      hasAlert={camera.hasAlert}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredCameras.map(camera => (
                    <div key={camera.id} className="flex gap-4 p-2 border border-security-border rounded-md hover:bg-security-muted/50 transition-colors">
                      <div className="w-40 h-24 overflow-hidden rounded-md">
                        <video 
                          src={camera.source} 
                          autoPlay 
                          muted 
                          loop 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{camera.name}</h3>
                          {camera.hasAlert && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-security-alert/20 text-security-alert">
                              Alert
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-security-foreground/70">ID: {camera.id}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="sm" className="h-7 px-2 text-xs">View</Button>
                          <Button variant="outline" size="sm" className="h-7 px-2 text-xs">Settings</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {filteredCameras.length === 0 && (
                <div className="flex flex-col items-center justify-center p-8 text-security-foreground/50">
                  <Camera className="h-10 w-10 mb-3" />
                  <p className="text-center">No cameras found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Cameras;
