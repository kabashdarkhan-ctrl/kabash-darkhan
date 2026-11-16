import {
  AbsoluteFill,
  Composition,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  title: string;
  subtitle: string;
  tagline: string;
};

const Scene: React.FC<{ text: string; size: number; weight?: number }> = ({
  text,
  size,
  weight = 700,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", padding: 80 }}
    >
      <div
        style={{
          color: "white",
          fontSize: size,
          fontWeight: weight,
          textAlign: "center",
          fontFamily: "sans-serif",
          opacity,
          transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const MyComponent: React.FC<Props> = ({ title, subtitle, tagline }) => {
  const frame = useCurrentFrame();
  const bg = interpolate(frame, [0, 270], [0, 40]);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, hsl(${150 + bg},55%,22%), hsl(${190 + bg},60%,12%))`,
      }}
    >
      <Sequence from={0} durationInFrames={90}>
        <Scene text={title} size={150} />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <Scene text={subtitle} size={90} weight={500} />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <Scene text={tagline} size={100} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="Promo"
      component={MyComponent}
      durationInFrames={270}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        title: "Отбасы",
        subtitle: "Отбасыңа арналған қолданба",
        tagline: "Бірге — жақынырақ",
      }}
    />
  );
};
