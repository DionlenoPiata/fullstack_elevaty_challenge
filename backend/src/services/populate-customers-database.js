"use strict";

const customerDao = require("../dao/customer-dao");

const customersArray = [
  {
    fullName: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    birthDate: "1985-03-20",
    phone: "+55(11)87654-3210",
    address: "Avenida Teste, 456",
    creditCards: [
      {
        cardNumber: "5678901234567890",
        cardHolder: "Maria Oliveira",
        expirationDate: "05/25",
        cvv: "234",
      },
      {
        cardNumber: "4321098765432109",
        cardHolder: "Carlos Oliveira",
        expirationDate: "08/25",
        cvv: "567",
      },
    ],
    invoiceLink:
      "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
  },
  {
    fullName: "Ana Souza",
    email: "ana.souza@example.com",
    birthDate: "1988-07-10",
    phone: "+55(11)76543-2109",
    address: "Rua Amostra, 789",
    creditCards: [
      {
        cardNumber: "8765432109876543",
        cardHolder: "Ana Souza",
        expirationDate: "07/25",
        cvv: "345",
      },
      {
        cardNumber: "2109876543210987",
        cardHolder: "Pedro Souza",
        expirationDate: "09/25",
        cvv: "678",
      },
    ],
    invoiceLink:
      "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
  },
  {
    fullName: "Lucas Santos",
    email: "lucas.santos@example.com",
    birthDate: "1992-05-25",
    phone: "+55(11)65432-1098",
    address: "Travessa Exemplo, 567",
    creditCards: [
      {
        cardNumber: "5432109876543210",
        cardHolder: "Lucas Santos",
        expirationDate: "11/25",
        cvv: "456",
      },
      {
        cardNumber: "1098765432109876",
        cardHolder: "Amanda Santos",
        expirationDate: "04/26",
        cvv: "789",
      },
    ],
    invoiceLink:
      "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
  },
  {
    fullName: "Rafael Lima",
    email: "rafael.lima@example.com",
    birthDate: "1983-11-12",
    phone: "+55(11)54321-0987",
    address: "Praça Teste, 234",
    creditCards: [
      {
        cardNumber: "4321098765432109",
        cardHolder: "Rafael Lima",
        expirationDate: "06/26",
        cvv: "567",
      },
      {
        cardNumber: "9876543210987654",
        cardHolder: "Fernanda Lima",
        expirationDate: "10/26",
        cvv: "890",
      },
    ],
    invoiceLink:
      "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
  },
  {
    fullName: "Carlos Pereira",
    email: "carlos.pereira@example.com",
    birthDate: "1995-08-18",
    phone: "+55(11)43210-9876",
    address: "Alameda Amostra, 890",
    creditCards: [
      {
        cardNumber: "3210987654321098",
        cardHolder: "Carlos Pereira",
        expirationDate: "04/26",
        cvv: "678",
      },
      {
        cardNumber: "7654321098765432",
        cardHolder: "Mariana Pereira",
        expirationDate: "12/25",
        cvv: "901",
      },
    ],
    invoiceLink:
      "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
  },
  {
    fullName: "Fernanda Costa",
    email: "fernanda.costa@example.com",
    birthDate: "1987-04-05",
    phone: "+55(11)32109-8765",
    address: "Avenida Amostra, 567",
    creditCards: [
      {
        cardNumber: "2345678901234567",
        cardHolder: "Fernanda Costa",
        expirationDate: "08/25",
        cvv: "789",
      },
      {
        cardNumber: "8901234567890123",
        cardHolder: "Rodrigo Costa",
        expirationDate: "09/24",
        cvv: "012",
      },
    ],
    invoiceLink:
      "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
  },
  {
    fullName: "Juliana Santos",
    email: "juliana.santos@example.com",
    birthDate: "1991-12-08",
    phone: "+55(11)21098-7654",
    address: "Rua Teste, 123",
    creditCards: [
      {
        cardNumber: "9876543210987654",
        cardHolder: "Juliana Santos",
        expirationDate: "07/26",
        cvv: "234",
      },
      {
        cardNumber: "5432109876543210",
        cardHolder: "Gustavo Santos",
        expirationDate: "01/27",
        cvv: "567",
      },
    ],
    invoiceLink:
      "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
  },
  {
    fullName: "Mariano Oliveira",
    email: "mariano.oliveira@example.com",
    birthDate: "1984-09-30",
    phone: "+55(11)10987-6543",
    address: "Travessa Amostra, 678",
    creditCards: [
      {
        cardNumber: "8765432109876543",
        cardHolder: "Mariano Oliveira",
        expirationDate: "05/26",
        cvv: "345",
      },
      {
        cardNumber: "4321098765432109",
        cardHolder: "Isabela Oliveira",
        expirationDate: "11/26",
        cvv: "678",
      },
    ],
    invoiceLink:
      "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
  },
  {
    fullName: "Roberta Silva",
    email: "roberta.silva@example.com",
    birthDate: "1993-02-14",
    phone: "+55(11)76543-2109",
    address: "Avenida Exemplo, 987",
    creditCards: [
      {
        cardNumber: "5432109876543210",
        cardHolder: "Roberta Silva",
        expirationDate: "02/27",
        cvv: "456",
      },
      {
        cardNumber: "1098765432109876",
        cardHolder: "Carlos Silva",
        expirationDate: "03/27",
        cvv: "789",
      },
    ],
    invoiceLink:
      "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
  },
  {
    fullName: "Anderson Santos",
    email: "anderson.santos@example.com",
    birthDate: "1996-06-08",
    phone: "+55(11)87654-3210",
    address: "Rua Amostra, 567",
    creditCards: [
      {
        cardNumber: "8765432109876543",
        cardHolder: "Anderson Santos",
        expirationDate: "03/27",
        cvv: "123",
      },
      {
        cardNumber: "4321098765432109",
        cardHolder: "Aline Santos",
        expirationDate: "09/27",
        cvv: "456",
      },
    ],
    invoiceLink:
      "https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf",
  },
];

exports.start = async () => {
  await populate();
};

async function populate() {
  try {
    const customers = await customerDao.get();

    if (customers && customers.totalDocs === 0) {
      console.log("Populate database!");
      customersArray.map(async (customer) => {
        await customerDao.create(customer);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
