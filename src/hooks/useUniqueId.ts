import { nanoid } from 'nanoid';
import { useRef } from 'react';
import uniqueId from 'lodash/uniqueId';

export default function useUniqueId(prefix: string) {
  const idRef = useRef<any>();

  if (!idRef.current) {
    idRef.current = `${uniqueId(prefix)}-${nanoid()}`;
  }

  return idRef.current;
}
