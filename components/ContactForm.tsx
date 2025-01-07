"use client"

import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

// Form type options
const formTypes = [
  { id: 'client', label: 'Looking to Hire' },
  { id: 'partner', label: 'Partnership Opportunity' },
  { id: 'general', label: 'General Inquiry' }
];

// Service types for client form
const services = [
  { value: 'bundle', label: 'All-in-One Business Bundle' },
  { value: 'biz-website', label: 'Business Website Development' },
  { value: 'saas', label: 'SaaS/Web Application Development' },
  { value: 'mobile-app', label: 'Mobile Application Development' },
  { value: 'marketing-design', label: 'Logo/Business Cards/Flyers Design' },
  { value: 'social-media-campaigns', label: 'Social Media Management & Ad Campaigns' },
  { value: 'tutoring', label: 'Technical Tutoring & Education' },
  { value: 'other', label: 'Other' },
];

// Partnership types
const partnershipTypes = [
  { value: 'investment', label: 'Investment Opportunity' },
  { value: 'startup', label: 'Startup Collaboration' },
  { value: 'business', label: 'Business Partnership' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'other', label: 'Other Opportunity' },
];

// Budget ranges for client form
const budgetRanges = [
  { value: '10-100', label: '$10 - $100' },
  { value: '100-500', label: '$100 - $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000+', label: '$1,000+' }
];

const ContactForm = () => {
  const [formType, setFormType] = useState('client');
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedPartnershipType, setSelectedPartnershipType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const baseData = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    let data;
    if (formType === 'client') {
      data = {
        ...baseData,
        type: 'client',
        service: selectedService,
        budget: selectedBudget,
        startDate: date ? format(date, 'yyyy-MM-dd') : '',
        phone: formData.get('phone'),
      };
    } else if (formType === 'partner') {
      data = {
        ...baseData,
        type: 'partner',
        partnershipType: selectedPartnershipType,
      };
    } else {
      data = {
        ...baseData,
        type: 'general',
      };
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          subject: formType === 'client' ? 'New Client Request' : 'New Partner Request',
          from: 'Personal Website'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        form.reset();
        setSelectedService("");
        setSelectedPartnershipType("");
        setSelectedBudget("");
        setDate(new Date);
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const renderFormTypeSelector = () => (
    <div className="flex space-x-2 mb-6">
      {formTypes.map((type) => (
        <Button
          key={type.id}
          type="button"
          variant={formType === type.id ? "default" : "outline"}
          className="flex-1"
          onClick={() => setFormType(type.id)}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );

  const renderClientForm = () => (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Service Type</label>
        <Select
          required
          value={selectedService}
          onValueChange={setSelectedService}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.value} value={service.value}>
                {service.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input 
            type="tel" 
            name="phone"
            placeholder="(555) 555-5555"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Budget Range</label>
          <Select
            required
            value={selectedBudget}
            onValueChange={setSelectedBudget}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Preferred Start Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              type="button"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );

  const renderPartnerForm = () => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Partnership Type</label>
      <Select
        required
        value={selectedPartnershipType}
        onValueChange={setSelectedPartnershipType}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select partnership type" />
        </SelectTrigger>
        <SelectContent>
          {partnershipTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {renderFormTypeSelector()}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                required 
                name="name"
                placeholder="John Doe"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                required 
                type="email" 
                name="email"
                placeholder="john@example.com"
                disabled={loading}
              />
            </div>
          </div>

          {formType === 'client' && renderClientForm()}
          {formType === 'partner' && renderPartnerForm()}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {formType === 'client' ? 'Project Details' : 'Message'}
            </label>
            <Textarea
              name="message"
              placeholder={
                formType === 'client' 
                  ? "Please share any specific requirements or questions you have about your project..."
                  : formType === 'partner'
                  ? "Tell me more about your partnership opportunity..."
                  : "How can I help you?"
              }
              className="h-32"
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </Button>
        </form>
      </CardContent>
      {submitted && (
        <CardFooter>
          <div className="w-full text-center text-green-600 font-medium">
            Thanks for reaching out! I&apos;ll be in touch soon.
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ContactForm;