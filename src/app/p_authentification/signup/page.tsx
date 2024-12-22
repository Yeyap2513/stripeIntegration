'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    country: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    dob: { day: '', month: '', year: '' },
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
    },
  });

  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name", value)

    if (name.startsWith('dob.')) {
      const dobField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        dob: {
          ...prev.dob,
          [dobField]: value,
        },
      }));
    } else if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form: ", formData)
    try {
      const response = await fetch('/api/pelpeur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          individual: {
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            dob: formData.dob,
            address: formData.address,
          },
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Compte créé avec succès !');
        router.push(`/${data.id}`); // Redirige l'utilisateur vers le tableau de bord ou une autre page
      } else {
        setMessage(`Erreur : ${data.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      setMessage('Une erreur s’est produite. Veuillez réessayer.');
    }
  };

  return (
    <div className="signup-form">
      <h1>Inscription Service Provider</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Prénom</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>

        <div>
          <label>Nom</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>

        <div>
          <label>Téléphone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <fieldset>
          <legend>Date de naissance</legend>
          <input type="number" name="dob.day" placeholder="Jour" value={formData.dob.day} onChange={handleChange} required />
          <input type="number" name="dob.month" placeholder="Mois" value={formData.dob.month} onChange={handleChange} required />
          <input type="number" name="dob.year" placeholder="Année" value={formData.dob.year} onChange={handleChange} required />
        </fieldset>

        <fieldset>
          <legend>Adresse</legend>
          <input type="text" name="address.line1" placeholder="Adresse" value={formData.address.line1} onChange={handleChange} required />
          <input type="text" name="address.city" placeholder="Ville" value={formData.address.city} onChange={handleChange} required />
          <input type="text" name="address.state" placeholder="État/Région" value={formData.address.state} onChange={handleChange} />
          <input type="text" name="address.postal_code" placeholder="Code postal" value={formData.address.postal_code} onChange={handleChange} required />
        </fieldset>

        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
