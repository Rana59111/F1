
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Bell, Search, Filter, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import AlertItem from '@/components/AlertItem';
import RespondModal from '@/components/RespondModal';
import { alerts } from '@/data/mockData';

const Alerts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [respondModalOpen, setRespondModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    
    return matchesSearch && matchesSeverity;
  });

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
              <h1 className="text-2xl font-bold">Security Alerts</h1>
              <p className="text-security-foreground/70">View and respond to security incidents</p>
            </div>
            <Button className="gap-2">
              <Bell size={16} />
              <span>Alert Settings</span>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Alert Management</CardTitle>
              <CardDescription>Search, filter and respond to security alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-security-foreground/50" />
                  <Input 
                    type="search" 
                    placeholder="Search alerts..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <div className="w-40">
                    <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                      <SelectTrigger>
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent className="bg-security-background border-security-border">
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Date Range</span>
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="active">
                <TabsList className="bg-security-muted mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  <TabsTrigger value="all">All Alerts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-2">
                  {filteredAlerts.length > 0 ? (
                    filteredAlerts.map(alert => (
                      <AlertItem 
                        key={alert.id}
                        id={alert.id}
                        title={alert.title}
                        description={alert.description}
                        location={alert.location}
                        timestamp={alert.timestamp}
                        severity={alert.severity}
                        onRespond={() => handleRespondClick(alert)}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-security-foreground/50">
                      <Bell className="h-10 w-10 mb-3" />
                      <p className="text-center">No alerts found matching your criteria</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="resolved" className="space-y-2">
                  <div className="flex flex-col items-center justify-center p-8 text-security-foreground/50">
                    <Bell className="h-10 w-10 mb-3" />
                    <p className="text-center">No resolved alerts yet</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="all" className="space-y-2">
                  {filteredAlerts.length > 0 ? (
                    filteredAlerts.map(alert => (
                      <AlertItem 
                        key={alert.id}
                        id={alert.id}
                        title={alert.title}
                        description={alert.description}
                        location={alert.location}
                        timestamp={alert.timestamp}
                        severity={alert.severity}
                        onRespond={() => handleRespondClick(alert)}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-security-foreground/50">
                      <Bell className="h-10 w-10 mb-3" />
                      <p className="text-center">No alerts found matching your criteria</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
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

export default Alerts;
