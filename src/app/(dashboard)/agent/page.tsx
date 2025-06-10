'use client';

import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface Language {
  name: string;
  value: string
}
interface Model {
  name: string;
  value: string;
  languages: Language[]
}
interface Provider {
  name: string;
  value: string;
  models: Model[]
}
interface STTConfig {
  stt: Provider[];
}

const AgentPage = () => {
  const [config, setConfig] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  useEffect(() => {
    fetch("/stt.json")
      .then((res) => res.json())
      .then((data: STTConfig) => {
        setConfig(data.stt);
      })
      .catch((err) => {
        console.error('Failed to load STT config:', err);
      });
  }, []);

  const handleProviderChange = (value: string) => {
    const provider = config.find(p => p.value === value);
    setSelectedProvider(provider || null);
    setSelectedModel(null);
    setSelectedLanguage(null);
  }

  const handleModelChange = (value: string) => {
    const model = selectedProvider?.models.find(m => m.value === value);
    setSelectedModel(model || null);
    setSelectedLanguage(null);
  };
  const handleLanguageChange = (value: string) => {
    const lang = selectedModel?.languages.find(l => l.value === value);
    setSelectedLanguage(lang || null);
  };


  return (
    <div className='p-6 space-y-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-9xl mx-auto'>
        <div>
          <Label className='mb-1 block text-md'>Provider</Label>
          <Select onValueChange={handleProviderChange}>
            <SelectTrigger className='w-full h-12'>
              <SelectValue placeholder="Select a provider" />
            </SelectTrigger>
            <SelectContent>
              {config.map((provider) => (
                <SelectItem key={provider.value} value={provider.value}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className='mb-1 block text-md'>Model</Label>
          <Select onValueChange={handleModelChange} disabled={!selectedProvider}>
            <SelectTrigger className='w-full h-12'>
              <SelectValue placeholder="Select a Model" />
            </SelectTrigger>
            <SelectContent>
              {selectedProvider?.models.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className='mb-1 block text-md'>Language</Label>
          <Select onValueChange={handleLanguageChange}>
            <SelectTrigger className='w-full h-12'>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {selectedModel?.languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedProvider && selectedModel && selectedLanguage && (
        <Card>
          <CardContent className="p-4">
            <p><strong>Provider: </strong> {selectedProvider.name} (<code>{selectedProvider.value}</code>)</p>
            <p><strong>Model: </strong> {selectedModel.name} (<code>{selectedModel.value}</code>)</p>
            <p><strong>Language: </strong> {selectedLanguage.name} (<code>{selectedLanguage.value}</code>)</p>
          </CardContent>
        </Card>
      )
      }
    </div >
  )
}

export default AgentPage 
