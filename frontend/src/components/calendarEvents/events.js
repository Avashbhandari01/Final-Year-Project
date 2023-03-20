const events = [
    {
      title: "New Year 2023",
      allDay: true,
      start: new Date(2023, 0, 1),
      end: new Date(2023, 0, 1)
    },
    {
      title: "Prithivi Jayanti",
      allDay: true,
      start: new Date(2023, 0, 11),
      end: new Date(2023, 0, 11)
    },
    {
      title: "Maghe Sankranti",
      allDay: true,
      start: new Date(2023, 0, 15),
      end: new Date(2023, 0, 15)
    },
    {
      title: "Sonam Lhochhar",
      allDay: true,
      start: new Date(2023, 0, 22),
      end: new Date(2023, 0, 22)
    },
    {
      title: "Basanta Panchami",
      allDay: true,
      start: new Date(2023, 0, 26),
      end: new Date(2023, 0, 26)
    },
    {
      title: "Maha Shivaratri",
      allDay: true,
      start: new Date(2023, 1, 18),
      end: new Date(2023, 1, 18)
    },
    {
      title: "Gyalpo Lhosar",
      allDay: true,
      start: new Date(2023, 1, 21),
      end: new Date(2023, 1, 21)
    },
    {
      title: "Holi",
      allDay: true,
      start: new Date(2023, 2, 6),
      end: new Date(2023, 2, 6)
    },
    {
      title: "Terai Holi",
      allDay: true,
      start: new Date(2023, 2, 7),
      end: new Date(2023, 2, 7)
    },
    {
      title: "Womans Day",
      allDay: true,
      start: new Date(2023, 2, 8),
      end: new Date(2023, 2, 8)
    },
    {
      title: "Ghode Jatra",
      allDay: true,
      start: new Date(2023, 2, 21),
      end: new Date(2023, 2, 21)
    },
    {
      title: "Nepali New Year",
      allDay: true,
      start: new Date(2023, 3, 14),
      end: new Date(2023, 3, 14)
    },
    {
      title: "Labour Day",
      allDay: true,
      start: new Date(2023, 4, 1),
      end: new Date(2023, 4, 1)
    },
    {
      title: "Buddha Jayanti",
      allDay: true,
      start: new Date(2023, 4, 5),
      end: new Date(2023, 4, 5)
    },
    {
      title: "Republic Day",
      allDay: true,
      start: new Date(2023, 4, 29),
      end: new Date(2023, 4, 29)
    },
    {
      title: "Gaura Parba",
      allDay: true,
      start: new Date(2023, 7, 24),
      end: new Date(2023, 7, 24)
    },
    {
      title: "Janai Purnima",
      allDay: true,
      start: new Date(2023, 7, 31),
      end: new Date(2023, 7, 31)
    },
    {
      title: "Rakshya Bandhan",
      allDay: true,
      start: new Date(2023, 7, 31),
      end: new Date(2023, 7, 31)
    },
    {
      title: "Krishna Janmashtami",
      allDay: true,
      start: new Date(2023, 8, 6),
      end: new Date(2023, 8, 6)
    },
    {
      title: "Teej",
      allDay: true,
      start: new Date(2023, 8, 18),
      end: new Date(2023, 8, 18)
    },
    {
      title: "Sambidhan Diwas",
      allDay: true,
      start: new Date(2023, 8, 20),
      end: new Date(2023, 8, 20)
    },
    {
      title: "Indra Jatra",
      allDay: true,
      start: new Date(2023, 8, 28),
      end: new Date(2023, 8, 28)
    },
    {
      title: "Dashain Vacation",
      allDay: true,
      start: new Date(2023, 9, 15),
      end: new Date(2023, 9, 28)
    },
    {
      title: "Ghatasthapana",
      allDay: true,
      start: new Date(2023, 9, 15),
      end: new Date(2023, 9, 15)
    },
    {
      title: "Maha astami",
      allDay: true,
      start: new Date(2023, 9, 22),
      end: new Date(2023, 9, 22)
    },
    {
      title: "Maha Nawami",
      allDay: true,
      start: new Date(2023, 9, 23),
      end: new Date(2023, 9, 23)
    },
    {
      title: "Bijaya Dashami",
      allDay: true,
      start: new Date(2023, 9, 24),
      end: new Date(2023, 9, 24)
    },
    {
      title: "Papakunsa Ekadashi",
      allDay: true,
      start: new Date(2023, 9, 25),
      end: new Date(2023, 9, 25)
    },
    {
      title: "Tihar Vacation",
      allDay: true,
      start: new Date(2023, 10, 11),
      end: new Date(2023, 10, 16)
    },
    {
      title: "Kaag Tihar",
      allDay: true,
      start: new Date(2023, 10, 11),
      end: new Date(2023, 10, 11)
    },
    {
      title: "Laxmi Pooja",
      allDay: true,
      start: new Date(2023, 10, 12),
      end: new Date(2023, 10, 12)
    },
    {
      title: "Sombare Aunshi",
      allDay: true,
      start: new Date(2023, 10, 13),
      end: new Date(2023, 10, 13)
    },
    {
      title: "Gobardhan Pooja",
      allDay: true,
      start: new Date(2023, 10, 14),
      end: new Date(2023, 10, 14)
    },
    {
      title: "Bhai Tika",
      allDay: true,
      start: new Date(2023, 10, 15),
      end: new Date(2023, 10, 15)
    },
    {
      title: "Chhath Puja",
      allDay: true,
      start: new Date(2023, 10, 19),
      end: new Date(2023, 10, 19)
    },
    {
      title: "Guru Nanak Jayanti",
      allDay: true,
      start: new Date(2023, 10, 27),
      end: new Date(2023, 10, 27)
    },
    {
      title: "Christmas",
      allDay: true,
      start: new Date(2023, 11, 25),
      end: new Date(2023, 11, 25)
    },
    {
      title: "Udhauli Parba",
      allDay: true,
      start: new Date(2023, 11, 26),
      end: new Date(2023, 11, 26)
    },
    {
      title: "Tamu Lhosar",
      allDay: true,
      start: new Date(2023, 11, 31),
      end: new Date(2023, 11, 31)
    },
  ]

export default events;