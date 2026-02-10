import Link from 'next/link';
import styles from './SectionComponent.module.css';

// 1. Definojmë "Interface" për të gjitha props
interface SectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  bgColor?: string;
  textColor?: string;
  btnBgColor?: string;
  btnTextColor?: string;

}

// 2. I japim komponentit tipin SectionProps
const SectionComponent: React.FC<SectionProps> = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  bgColor = "#ffffff", 
  textColor = "#444444",
  btnBgColor = "#e0ddd5", 
  btnTextColor = "#555555" 
 
}) => {
  return (
    <section 
      className={styles.sectionWrapper} 
      style={{ 
        backgroundColor: bgColor, 
       
      }}
    >
      <div className={styles.container}>
        
        {title && (
          <h2 className={styles.title} style={{ color: textColor }}>
            {title}
          </h2>
        )}
        
        {description && (
          <div 
            className={styles.description} 
            style={{ color: textColor }}
            dangerouslySetInnerHTML={{ __html: description }} 
          />
        )}

       {buttonText && buttonLink && (
          <Link 
            href={buttonLink} 
            className={styles.button}
            style={{ backgroundColor: btnBgColor, color: btnTextColor }}
          >
            {buttonText}
          </Link>
        )}
        
      </div>
    </section>
  );
};

export default SectionComponent;