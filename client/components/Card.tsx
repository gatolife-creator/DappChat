import { useRouter } from "next/router";
import { motion } from "framer-motion";

type Props = {
  title: string;
  description: string;
  link: string;
  className?: string;
};

const Card = ({ title, description, link, className }: Props) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    router.push(link);
  };

  return (
    <motion.div
      className={`card w-96 bg-base-100 shadow-xl h-[212px] hover:cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleClick(e)
      }
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default Card;
