
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Police, ShieldAlert, Siren } from 'lucide-react';

interface RespondModalProps {
  isOpen: boolean;
  onClose: () => void;
  alertId?: string;
  alertTitle?: string;
}

const RespondModal: React.FC<RespondModalProps> = ({
  isOpen,
  onClose,
  alertId,
  alertTitle
}) => {
  const [selectedResponders, setSelectedResponders] = React.useState<string[]>([]);
  const [urgency, setUrgency] = React.useState('medium');

  const handleResponderToggle = (value: string) => {
    setSelectedResponders(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    // Here you would handle the submission of the response
    console.log({
      alertId,
      responders: selectedResponders,
      urgency
    });
    
    // Reset form and close modal
    setSelectedResponders([]);
    setUrgency('medium');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-security-background border-security-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Response Action</DialogTitle>
          <DialogDescription>
            {alertTitle ? `Respond to alert: ${alertTitle}` : 'Select responders for this alert'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Responders</Label>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="responder-security" 
                  checked={selectedResponders.includes('security')}
                  onCheckedChange={() => handleResponderToggle('security')}
                />
                <Label htmlFor="responder-security" className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-security-primary" />
                  Security Guards
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="responder-police" 
                  checked={selectedResponders.includes('police')}
                  onCheckedChange={() => handleResponderToggle('police')}
                />
                <Label htmlFor="responder-police" className="flex items-center gap-2">
                  <Police className="h-4 w-4 text-security-primary" />
                  Police
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="responder-ambulance" 
                  checked={selectedResponders.includes('ambulance')}
                  onCheckedChange={() => handleResponderToggle('ambulance')}
                />
                <Label htmlFor="responder-ambulance" className="flex items-center gap-2">
                  <Siren className="h-4 w-4 text-security-primary" />
                  Ambulance
                </Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger id="urgency">
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent className="bg-security-background border-security-border">
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            disabled={selectedResponders.length === 0} 
            onClick={handleSubmit}
          >
            Dispatch Responders
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RespondModal;
