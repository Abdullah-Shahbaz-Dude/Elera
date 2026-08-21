import mindSyncImg from '../../assets/images/mindsync/mindsync-image-1.jpg';
import futureSyncImg from '../../assets/images/futuresync/futureSync-3.jpg';

const PROGRAMME_IMAGES: Record<string, string> = {
  'mind-sync': mindSyncImg,
  'future-sync': futureSyncImg,
};

export function getProgrammeImage(programmeId: string): string {
  return PROGRAMME_IMAGES[programmeId] ?? mindSyncImg;
}

export function getProgrammeBadge(programme: {
  programme_id: string;
  progress_percent: number;
  status: string;
}): { label: string; tone: 'new' | 'popular' | 'progress' } {
  if (programme.progress_percent > 0 && programme.status !== 'completed') {
    return { label: `${programme.progress_percent}% complete`, tone: 'progress' };
  }
  if (programme.programme_id === 'future-sync') {
    return { label: 'Future Sync', tone: 'popular' };
  }
  return { label: 'Training', tone: 'new' };
}
