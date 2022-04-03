import { useRouter } from 'next/router';
import { useState } from 'react';

const useRedirect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const push = async (url: string) => {
    setLoading(true);
    console.log(url)
    await router.push(url);
    setLoading(false);
  };

  return { loading, router, push };
};

export default useRedirect;
