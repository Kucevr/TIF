import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  to?: string;
}

export const AnimatedLink = ({ children, className, href, to, onClick, ...props }: AnimatedLinkProps) => {
  const linkProps = {
    className: cn("group relative inline-flex overflow-hidden font-medium cursor-pointer h-[1.25em] items-center text-inherit", className),
    onClick,
    ...props
  };

  const innerContent = (
    <>
      <span className="relative flex items-center h-full transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        <span className="transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:skew-x-[15deg] group-hover:scale-y-[0.6] origin-bottom tracking-tight">
          {children}
        </span>
      </span>
      <span className="absolute left-0 top-full flex justify-center items-center w-full h-full transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        <span className="transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] skew-x-[-15deg] scale-y-[0.6] origin-top group-hover:skew-x-0 group-hover:scale-y-100 tracking-tight">
          {children}
        </span>
      </span>
    </>
  );

  if (to || (href && href.startsWith('/'))) {
    return (
      <Link to={(to || href) as string} {...linkProps}>
        {innerContent}
      </Link>
    );
  }

  return (
    <a href={href} {...linkProps}>
      {innerContent}
    </a>
  );
};
