import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";

import Button from "../components/Button";
import "../styles/Contact.css";

const PROFANITY_PATTERN = /(puta|buceta|merda|caralho|foda|fdp|vadia|bosta|porra|vtnc|cacete|desgra|pqp|otario|otária|idiota|canalha)/i;

function isValidName(value) {
  const normalizedValue = value.trim();
  return normalizedValue.length >= 2 && !PROFANITY_PATTERN.test(normalizedValue);
}

function isValidEmail(value) {
  const normalizedValue = value.trim();
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\.[a-zA-Z0-9-]+)*$/;

  return emailPattern.test(normalizedValue);
}

export default function Contact({ setPage }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    servico: "",
    mensagem: "",
  });
  const [error, setError] = useState("");

  const updateField = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailValue = formData.email.trim();

    if (!isValidName(formData.nome)) {
      setError("Digite um nome válido, sem palavrões.");
      return;
    }

    if (!isValidEmail(emailValue)) {
      setError("Digite um e-mail verdadeiro.");
      return;
    }

    if (!formData.telefone.trim() || formData.telefone.replace(/\D/g, "").length < 10) {
      setError("Informe um telefone válido.");
      return;
    }

    setError("");
    window.alert("Mensagem enviada com sucesso!");
  };
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <button className="contact-back" onClick={() => setPage("home")} type="button">
          <ArrowLeft size={18} />
          Voltar
        </button>

        <motion.div
          className="contact-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="tag">Contato</span>

          <h1>
            Fale com o <strong>R.tual Hair Care</strong> e agende seu horário.
          </h1>

          <p>
            Encontre nossos canais de atendimento e escolha a melhor forma de
            falar com a equipe.
          </p>

          <div className="contact-actions">
            <Button onClick={() => setPage("home")}>Ver serviços</Button>
            <Button variant="secondary" onClick={() => setPage("login")}>
              Acessar sistema
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="contact-visual"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <div className="contact-visual-card">
            <span className="tag">Atendimento rápido</span>
            <h3>Um espaço acolhedor para cuidar da sua beleza.</h3>
            <p>
              Entre em contato para esclarecer dúvidas sobre corte,
              coloração, hidratação, manicure e pedicure.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="contact-section">
        <div className="contact-title">
          <span className="tag">Fale conosco</span>
          <h2>Envie uma mensagem</h2>
          <p>
            Deixe seus dados e conte como podemos ajudar no seu próximo atendimento.
          </p>
        </div>

        <div className="contact-layout">
          <motion.form
            className="contact-form"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
          >
            <label>
              Nome
              <div className="contact-input">
                <User size={20} />
                <input type="text" placeholder="Seu nome" value={formData.nome} onChange={updateField("nome")} />
              </div>
            </label>

            <label>
              E-mail
              <div className="contact-input">
                <Mail size={20} />
                <input type="email" placeholder="seuemail@email.com" value={formData.email} onChange={updateField("email")} />
              </div>
            </label>

            <label>
              Telefone
              <div className="contact-input">
                <Phone size={20} />
                <input type="text" placeholder="(00) 00000-0000" value={formData.telefone} onChange={updateField("telefone")} />
              </div>
            </label>

            <label>
              Serviço desejado
              <div className="contact-input">
                <MessageCircle size={20} />
                <input type="text" placeholder="Ex.: corte, escova, hidratação" value={formData.servico} onChange={updateField("servico")} />
              </div>
            </label>

            <label>
              Mensagem
              <textarea placeholder="Conte o que você precisa..." value={formData.mensagem} onChange={updateField("mensagem")} />
            </label>

            {error && <p className="contact-form-error" role="alert">{error}</p>}

            <button type="submit" className="contact-submit">
              <Send size={18} />
              Enviar mensagem
            </button>
          </motion.form>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3>Canais de atendimento</h3>
            <p>
              Estamos prontos para orientar você sobre serviços, horários e cuidados.
            </p>

            <div className="contact-info-list">
              <div>
                <MessageCircle />
                <span>WhatsApp</span>
                <strong>(19) 99389-5612</strong>
              </div>

              <div>
                <Mail />
                <span>E-mail</span>
                <strong>contato@rtualhaircare.com</strong>
              </div>

              <div>
                <MapPin />
                <span>Endereço</span>
                <strong>Alameda dos Vidoeiros, 455 - Gramado Mall</strong>
              </div>

              <div>
                <Globe />
                <span>Site</span>
                <strong>rtualhaircare.com</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
