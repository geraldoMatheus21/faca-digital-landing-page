// components/email/index.jsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser'; // ← IMPORTAR EMAILJS
import './email.css'; // Se tiver CSS próprio

export default function Email() {
  const form = useRef();
  const [alert, setAlert] = useState({ visible: false, message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Pegar as credenciais do environment
  const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const public_key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!form.current.user_email.value || !form.current.message.value) {
      setAlert({ visible: true, message: 'Preencha todos os campos', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    
    emailjs.sendForm(service_id, template_id, form.current, public_key)
      .then((result) => {
        setIsSubmitting(false);
        console.log('Resultado:', result.text);
        
        if (result.text === 'OK') {
          setAlert({ visible: true, message: 'E-mail enviado com sucesso!', type: 'success' });
          form.current.reset(); // Limpa o formulário
        } else {
          setAlert({ visible: true, message: 'Erro ao enviar e-mail', type: 'error' });
        }
      }, (error) => {
        setIsSubmitting(false);
        console.error('Erro EmailJS:', error);
        setAlert({ visible: true, message: 'Erro ao enviar e-mail', type: 'error' });
      });
  };

  useEffect(() => {
    // Inicializar EmailJS com a public key
    if (public_key) {
      emailjs.init(public_key);
    }
  }, [public_key]);

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert({ visible: false, message: '', type: '' });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="email-form-container">
      {alert.visible && (
        <div className={`email-alert ${alert.type === 'success' ? 'email-alert-success' : 'email-alert-error'}`}>
          {alert.type === 'success' ? 
            <IoCheckmarkCircleOutline className="email-alert-icon" /> : 
            <IoCloseCircleOutline className="email-alert-icon" />
          }
          <span>{alert.message}</span>
        </div>
      )}
      
      <h2 className="email-form-title">
        Nos mande um <span>e-mail</span>
      </h2>
      
      <motion.form
        ref={form}
        onSubmit={sendEmail}
        className="email-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="form-group">
          <input
            type="email"
            name="user_email"
            placeholder="seu@email.com"
            className="email-input"
            required
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Como podemos ajudar sua marca?"
            className="email-textarea"
            rows={5}
            required
          />
        </div>
        
        <button
          type="submit"
          className="email-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </motion.form>
    </div>
  );
}