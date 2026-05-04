import { updateMedia } from '@/lib/updates/updateMedia';
import UpdateMediaCard from './UpdateMediaCard';

export default function UpdateGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {updateMedia.map(item => (
        <UpdateMediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}
