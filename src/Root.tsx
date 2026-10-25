import { Composition } from 'remotion';
import { MainVideo } from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MainVideo}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
