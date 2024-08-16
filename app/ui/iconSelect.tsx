"use client"
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/app/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/ui/select';
import { Input } from '@/app/ui/input';
import { ScrollArea } from '@/app/ui/scroll-area';
import * as Icons from 'lucide-react';
import { iconMap } from '@/utils/iconMap';

export const IconSelect = ({ form, name }: { form: any; name: string }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredIcons = Object.entries(iconMap).filter(([key]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <div className="mb-2 px-2">
                  <Input 
                    placeholder="Search icons..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-[200px]">
                  {filteredIcons.map(([key, Icon]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center">
                        {React.createElement(Icon, { className: "w-4 h-4 mr-2" })}
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  
  export default IconSelect;