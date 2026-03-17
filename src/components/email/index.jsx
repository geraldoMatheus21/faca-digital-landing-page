// components/email/index.jsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './email.css';

export default function Email() {
  const form = useRef();
  const [alert, setAlert] = useState({ visible: false, message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const public_key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // Logs para depuração (opcional, pode remover depois)
  console.log('🔑 Public Key carregada:', public_key);

  const sendEmail = (e) => {
    e.preventDefault();
    
    // Valida apenas os campos existentes: email e message
    if (!form.current.email.value || !form.current.message.value) {
      setAlert({ visible: true, message: 'Preencha todos os campos', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    
    emailjs.sendForm(service_id, template_id, form.current)
      .then((result) => {
        setIsSubmitting(false);
        console.log('✅ Resultado:', result.text);
        
        if (result.text === 'OK') {
          setAlert({ visible: true, message: 'E-mail enviado com sucesso!', type: 'success' });
          form.current.reset();
        } else {
          setAlert({ visible: true, message: 'Erro ao enviar e-mail', type: 'error' });
        }
      }, (error) => {
        setIsSubmitting(false);
        console.error('❌ Erro EmailJS:', error);
        setAlert({ visible: true, message: 'Erro ao enviar e-mail', type: 'error' });
      });
  };

  useEffect(() => {
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
    <div id="email-form" className="email-form-container">
      {alert.visible && (
        <div className={`email-alert ${alert.type === 'success' ? 'email-alert-success' : 'email-alert-error'}`}>
          {alert.type === 'success' 
            ? <IoCheckmarkCircleOutline className="email-alert-icon" /> 
            : <IoCloseCircleOutline className="email-alert-icon" />
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
        {/* Campo de e-mail */}
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="seu@email.com"
            className="email-input"
            required
          />
        </div>
        
        {/* Campo de mensagem */}
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