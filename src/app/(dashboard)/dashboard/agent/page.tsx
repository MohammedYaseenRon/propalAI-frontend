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

        const saved = localStorage.getItem("sttSelection");
        if (saved) {
          const { provider, model, language } = JSON.parse(saved);
          const foundProvider = data.stt.find(p => p.value === provider);
          const foundModel = foundProvider?.models.find(m => m.value === model);
          const foundLanguage = foundModel?.languages.find(l => l.value === language);


          setSelectedProvider(foundProvider || null);
          setSelectedModel(foundModel || null);
          setSelectedLanguage(foundLanguage || null);
        }
      })
      .catch((err) => {
        console.error('Failed to load STT config:', err);
      });
  }, []);

  useEffect(() => {
    if (selectedProvider && selectedModel && selectedLanguage) {
      localStorage.setItem(
        "sttSelection",
        JSON.stringify({
          provider: selectedProvider.value,
          model: selectedModel.value,
          language: selectedLanguage.value,
        })
      );
    }
  }, [selectedProvider, selectedModel, selectedLanguage]);

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
          <Select onValueChange={handleProviderChange} value={selectedProvider?.value}>
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
          <Select onValueChange={handleModelChange} value={selectedModel?.value} disabled={!selectedProvider}>
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
          <Select onValueChange={handleLanguageChange} value={selectedLanguage?.value} disabled={!selectedModel}>
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
        <Card className="shadow-lg rounded-2xl border border-gray-200 bg-white">
          <CardContent className="p-6 space-y-3 text-gray-800">
            <div>
              <p className="text-sm font-semibold text-gray-600">Provider:</p>
              <p className="text-lg font-medium">{selectedProvider?.name} <span className="text-sm text-gray-500">({selectedProvider?.value})</span></p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Model:</p>
              <p className="text-lg font-medium">{selectedModel?.name} <span className="text-sm text-gray-500">({selectedModel?.value})</span></p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Language:</p>
              <p className="text-lg font-medium">{selectedLanguage?.name} <span className="text-sm text-gray-500">({selectedLanguage?.value})</span></p>
            </div>
          </CardContent>
        </Card>

      )
      }
    </div >
  )
}

export default AgentPage 
