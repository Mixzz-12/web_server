import { Suspense } from 'react';
import SuccessClient from './SuccessClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-400">กำลังโหลด...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
