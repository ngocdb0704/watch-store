'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreToken } from '@/store/authSlice';

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(restoreToken(token));
    }
  }, [dispatch]);

  return null;
}