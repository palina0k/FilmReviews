import { Inter, Montserrat } from 'next/font/google';
import { Limelight } from 'next/font/google';
import { Oswald } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const limelight = Limelight({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-limelight', 
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300'],
  style: ['normal'],
  variable: '--font-oswald',
})

const fonts = [inter, montserrat, limelight, oswald];

const font_variables = fonts.map((font) => font.variable);
const font_string = font_variables.join(' ');
export default font_string;
