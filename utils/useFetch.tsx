import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Option {
  url: string;
  body?: {};
  method: 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  messages?: {
    success: string;
    loading: string;
    error?: string;
  };
  onSuccess?: () => void;
}

export default function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const mutate = async (option: Option) => {
    let message;
    if (option.messages) {
      message = toast.loading(option.messages.loading);
    }
    setIsLoading(true);
    const res = await fetch(option.url, {
      method: option.method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(option.body),
    });
    if (res.ok) {
      const data = await res.json();
      setData(data);
      if (option.messages) {
        toast.success(option.messages.success, {
          id: message,
        });
      }
      option.onSuccess && option.onSuccess();
    } else {
      if (option.messages) {
        toast.error(option.messages.error || 'Something Went Wrong', {
          id: message,
        });
      }
    }
    setIsLoading(false);
  };

  return { mutate, isLoading, data };
}
