
import { Product, User } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Neon Soul Hoodie',
    price: 65.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI-NEt_c_z1PX8qmzTb_CA5E-FIQk5hNDGjMSJHk4xy6OPwMSkTHUF8mtXKtpRrL72Ig-rFYRy-R3jjZ5MiGNG8EL1fcwPDpTfuLFkKTwy4zobOzzV_fFFMFYu5cmrkztnrJcDJYn6B_Lsd5o8giZiPBlgjKuPsmQKFyCb80BtAhQr1DePGTPQi4WLN7wbw4LmuX49IQdKmTuw6X3NxDjBX3UML6QQmQwX4qnQeYMWf13Qw5XnCNdHenEmg2n0ijgXa7Sp1BjRpvpJ',
    description: 'Domina la noche con nuestra sudadera Neon Soul. Algodón premium con detalles reactivos a la luz ultravioleta.',
    category: 'Hoodies',
    colors: ['#000000', '#3a1542'],
    sizes: ['S', 'M', 'L', 'XL'],
    isHot: true
  },
  {
    id: '2',
    name: 'Cyber Punk Tee',
    price: 32.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1At2K62vcJFapM16P2-5HhZf49nzCC6gHmCe9dMH6a3yw2OwCndV3K5k8Mh0pjSPz162vYE4w_3PuuEy8T4nEw52ue8x4Lt6KRQWHZwxGyI5FD17uFmNQ6GHWnkDVW4yaOPJS7_M5R75FDR0ymMKWec3F9Sq0LQjl3cyQ15VN96EC7ENxhU9Ly0cObxmoVY6g7UR2VAPnwqu2-AocroI3xAdi00EL2_FNA957XyorAdz6HAR66yJbJEjwdTlYDBT8ozJ3AYGJZObE',
    description: 'Camiseta de corte oversized con estampado futurista inspirado en la estética glitch.',
    category: 'Tees',
    colors: ['#000000', '#ffffff'],
    sizes: ['M', 'L'],
    isNew: true
  },
  {
    id: '3',
    name: 'Midnight Reaper Tee',
    price: 45.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3f0cKU-3SPaJzYIDrAUl_F1Rbuwzr5eETEpJmhSSWhGu9VKXErupg7DxCD_e6tVaYgIA2BDlcU_p699jKddyyAxB4e-VrgWbvAJHfyEmTM6mLdu62L5yqcHjK8sPJ2PSgnoADDle4ToJRVp8HH3oAwP7sl9CzRY2XyHwaykQOYNxMbUawzx1JPyAhM_9gL9Vc2SGxj7lGPFYq38O2-qVLXnrTCud6xfOkW9Cerhbt3r0GLfmTT3EFzjXV1hggr7JLh6btZQrrDnRx',
    description: 'Edición limitada de Halloween. Algodón de alto gramaje con gráfico frontal serigrafiado.',
    category: 'Halloween',
    colors: ['#000000'],
    sizes: ['S', 'M', 'L'],
    isHot: true
  },
  {
    id: '4',
    name: 'Phantom Joggers',
    price: 89.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxek6h1WbRE75rmM3stwUjXR-aXjegL32mJb4c71nVr4asj-SmJWtq3S1A_sNxkjk6JGppXShTsQ2TTAgex0Z7z2WUnjZdCP-tSuIYFTFQVAVEC4lda3npKc5tQ2ILkKSP_TFP1eP5Qcw1I0LXXN7qH3dmRxTqdS5anHw8WHC0B59JJderofOmkU2cNgCD-IVfGWZa8JtvSePHc_YfoEU29z47qM455DdtTDeaQzOrVLqpoR94y17HMT76dMigrw1FB41-Uh7WrzV1',
    description: 'Pantalones tipo cargo con múltiples bolsillos y ajuste técnico para movilidad urbana.',
    category: 'Pants',
    colors: ['#000000', '#1a2632'],
    sizes: ['30', '32', '34'],
  },
  {
    id: '5',
    name: 'Void Runner X1',
    price: 145.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs_p-izVYCMV1aTBJU-0fK9-wANAm11waZ5QsnAlIvpGMW18toxo9-icezCUKrY1smi0kxNhTUqxGKMi0oFpg0W911rQk10u-QzoDirufsAKhwc6mZuWkFm7syxhiQqXbGYOb_eb7I2Wk-IR61VVJn2mJGD5sNOKAFEcgGF0phqFX1hHQ-_O1KAY1tT5ZcEGjQnaUKd91mUGbWAVI0hjfZg_3MbQ8lJqJ8waGRdRGTsOrVDMi0TViuFcIh50emKL7DFf4u68RIPmNU',
    description: 'Sneakers de alto rendimiento con suela de carbono y estética industrial.',
    category: 'Sneakers',
    colors: ['#000000', '#ff6b00'],
    sizes: ['40', '41', '42', '43', '44'],
    isNew: true
  },
  {
    id: '6',
    name: 'Shadow Beanie',
    price: 25.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw6jszagdBPMYib-Nwk2dZTM47dXqI5GUE4VS_jw4qNnvyeThRAMhppY8KydsgSlOWDPlwZvYA2-x3XEySyj2UneK83gI0ZekmVOPfRD2Fr3wdJ9a725QmxtrENmtft7oTxhvMxqb61LsE7dZhuijohE4UxYuY1EOYTGrX9mrnpUzGlE-8qIZllAZuEPnb2lOi-k6UK1EH6p7EmwL7vVU9mP9g08qkWu6Gjd1zva7alDtDwmd0x5PmDQb8KAJrb_93-a1WhRXoqFet',
    description: 'Gorro de punto fino con logo bordado en tono sobre tono.',
    category: 'Accessories',
    colors: ['#000000', '#7f13ec'],
    sizes: ['Unique'],
  },
  {
    id: '7',
    name: 'Glitch Utility Vest',
    price: 110.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrLrGDlNb0q_c0g_q25jJIeQ0C59jlyjW6RIpa_ioyK05erEbeNbsy4axeTxm6aLrbm8uaVjskQCBgLHz0TbW0i5p_uVjAOL_XsxulMsdSyZCiZNjhDhT2GJVOGYtOXOEzOkZaKOYfJ8DivJ9JED6HrbZRsF6r5OK89_LlCYGmo2oHISxfv7jqC6mnJLTBQvykMpsv-AkFcwTfaStcJrF7akm81Fj-VfaBpkYcHx9RJgPssPnGlv6veKx1eyigbUmog6poEpcFFQ-g',
    description: 'Chaleco utilitario con paneles reflectantes y múltiples puntos de anclaje.',
    category: 'Outerwear',
    colors: ['#1a2632'],
    sizes: ['S', 'M', 'L'],
    isHot: true
  }
];

export const MOCK_USER: User = {
  name: 'Alex Rivera',
  email: 'alex.rivera@wearone.com',
  level: 3,
  xp: 1250,
  points: 250,
  ordersCount: 12,
  couponsCount: 4,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy75ng3N3IMgnhLKaKe1ZgeeoaCTpd6PFjCuY7ssh7JYNc89Zfb4eW_61USrctp0O4AfS5p9MCDc-ayCqv7CkjgCugqhSLxgftxOJlmvOob79VQ9mIXNNcyxPB0CvzyZqSLqYDPvK_45Rup48p3KxIdyi5Jk3oaORrPEw__AJv26oCTwCzJvy8-0gbKkpmOT6GqadwfLKZqvtkABEbGuvOEnoaql7QvhryKnVtkEtB48Q-PShiE_h_D-I3V7848NfzHQDUCurM9yaw'
};
