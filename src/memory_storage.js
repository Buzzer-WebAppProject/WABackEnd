let storage = {
  users: [
    {
      fullname: "David Kostic",
      UID: 1,
      mail: "dkostic@mail.com",
      beehiveCount: 3,
      beehives: [
        {
          bId: 1,
          lastFeedingDate: "12.3.2021.",
          InsideTemperature: 35,
          OutsideTemperature: "22 C",
        },
        {
          bId: 2,
          lastFeedingDate: "12.3.2021.",
          InsideTemperature: "35 C",
          OutsideTemperature: "22 C",
        },
        {
          bId: 3,
          lastFeedingDate: "12.3.2021.",
          InsideTemperature: "35 C",
          OutsideTemperature: "22 C",
        },
      ],
    },
    {
      fullname: "David Maglica",
      UID: 2,
      mail: "dmaglica@mail.com",
      beehiveCount: 1,
      beehives: [
        {
          bId: 1,
          lastFeedingDate: "12.3.2021.",
          InsideTemperature: "35 C",
          OutsideTemperature: "22 C",
        },
      ],
    },
  ],
};

export default storage;
