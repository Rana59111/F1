import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Bell, Camera, ExternalLink, HandHeart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import VideoFeed from '@/components/VideoFeed';
import AlertItem from '@/components/AlertItem';
import RespondModal from '@/components/RespondModal';
import { videoFeeds, alerts, generateRandomAlert } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';
import { AlertSeverity } from '@/types/alerts';

const CameraFeed = ({ camera }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (camera.id === 'cam-live' && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error accessing webcam:", err);
        });
    }
  }, [camera]);

  return (
    <div>
      <h3>{camera.name}</h3>
      {camera.id === 'cam-live' ? (
        <video ref={videoRef} autoPlay muted width="100%" />
      ) : (
        <video src={camera.source} autoPlay loop muted width="100%" />
      )}
    </div>
  );
};

const Dashboard = () => {
  const [activeAlerts, setActiveAlerts] = useState(alerts);
  const [respondModalOpen, setRespondModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = generateRandomAlert();
        setActiveAlerts(prev => [newAlert, ...prev].slice(0, 10));
        toast({
          title: "New Alert",
          description: newAlert.title,
          variant: "destructive"
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [toast]);

  const handleRespondClick = (alert: any) => {
    setSelectedAlert(alert);
    setRespondModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Safety Dashboard</h1>
              <p className="text-security-foreground/70">Monitor and respond to safety alerts</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Camera size={16} />
                <span>Add Camera</span>
              </Button>
              <Button className="gap-2 bg-[#D946EF] hover:bg-[#D946EF]/90">
                <Bell size={16} />
                <span>View Alerts</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <HandHeart className="h-5 w-5 text-[#D946EF]" />
                  <span>Safety Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-security-foreground/70">System Status</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-security-success/20 text-security-success">
                      Active
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-security-foreground/70">Active Alerts</span>
                    <span className="text-sm font-bold">{activeAlerts.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-security-foreground/70">Online Cameras</span>
                    <span className="text-sm font-bold">{videoFeeds.length}/4</span>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" className="w-full text-xs h-8">
                      System Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#D946EF]" />
                  <span>Safety Alerts</span>
                </CardTitle>
                <CardDescription>Recent alerts requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {activeAlerts.map(alert => (
                    <AlertItem 
                      key={alert.id}
                      id={alert.id}
                      title={alert.title}
                      description={alert.description}
                      location={alert.location}
                      timestamp={alert.timestamp}
                      severity={alert.severity as AlertSeverity}
                      onRespond={() => handleRespondClick(alert)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-security-muted">
                <TabsTrigger value="all">All Cameras</TabsTrigger>
                <TabsTrigger value="alerts">Alert Cameras</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <ExternalLink size={14} />
                <span>Full View</span>
              </Button>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {videoFeeds.map(feed => (
                  <VideoFeed 
                    key={feed.id}
                    id={feed.id}
                    name={feed.name}
                    source={feed.source}
                    hasAlert={feed.hasAlert}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="alerts" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {videoFeeds.filter(feed => feed.hasAlert).map(feed => (
                  <VideoFeed 
                    key={feed.id}
                    id={feed.id}
                    name={feed.name}
                    source={feed.source}
                    hasAlert={feed.hasAlert}
                  />
                ))}
              </div>
            </TabsContent>
            {videoFeeds.map((cam) => (
                <CameraFeed key={cam.id} camera={cam} />
            ))}
          </Tabs>
        </div>
      </main>
      
      <RespondModal 
        isOpen={respondModalOpen}
        onClose={() => setRespondModalOpen(false)}
        alertId={selectedAlert?.id}
        alertTitle={selectedAlert?.title}
      />
    </div>
  );
};

export default Dashboard;
