# Configuração do Formulário de Contato

## Status Atual
O formulário atualmente abre o cliente de email padrão do usuário. Funciona, mas não envia diretamente.

## Opção Recomendada: Formspree (Gratuito)

### Passo a passo:

1. **Crie uma conta no Formspree:**
   - Acesse: https://formspree.io
   - Crie uma conta gratuita (50 envios/mês)

2. **Crie um novo formulário:**
   - Clique em "New Form"
   - Escolha um nome (ex: "Portfolio Contact")
   - Copie o **Form ID** (algo como `xzbvqwer`)

3. **Configure o código:**
   - Abra `src/components/Contact.tsx`
   - Linha 42: Substitua `YOUR_FORMSPREE_ID` pelo seu Form ID
   - Exemplo: `const FORMSPREE_ID = 'xzbvqwer'`

4. **Pronto!**
   - O formulário agora enviará emails diretamente para você
   - Você receberá notificações por email de cada submissão

## Alternativa: EmailJS

Se preferir EmailJS:

1. Crie conta em: https://www.emailjs.com
2. Configure um serviço de email (Gmail, etc.)
3. Crie um template
4. Obtenha: Service ID, Template ID, e Public Key
5. Atualize o código conforme documentação do EmailJS

## Outras Opções

- **Netlify Forms**: Se deployar na Netlify
- **Backend próprio**: Node.js + Nodemailer
- **Resend**: Serviço moderno de email (pago)

