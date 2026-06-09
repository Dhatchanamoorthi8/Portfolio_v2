interface TechBadgeProps {
  name: string;
  size?: 'sm' | 'md';
}

export default function TechBadge({ name, size = 'md' }: TechBadgeProps) {
  return (
    <span className={`tech-badge tech-badge--${size}`}>
      {name}
    </span>
  );
}
