import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {

  return (
    <div className="footer-bar mt-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center py-3 relative z-10">
          <div className="">
          </div>
          
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a 
              href="https://github.com/kurosakiaduma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/tevin-aduma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:tevin74@live.com" 
              className="hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;