class room {
    constructor(roomNumber, roomType, price) {
      this.roomNumber = roomNumber;
      this.roomType = roomType;
      this.price = price;
      this.avaliable = true;
    }
  
    checkAvailability() {
      return this.available;
    }
    updateStatus(status) {
      this.available = status;
    }
  }
   //reservations details
  class Reservation {
      static nextReservationId = 1;
    
    constructor(checkInDate, checkOutDate, room) {
      this.reservationId = Reservation.generateReservationId();
      this.checkInDate = new Date(checkInDate)
       this.checkOutDate = new Date(checkOutDate)
      this.room = room;
      this.status = "pending";
    } 
    static generateReservationId() {
      return this.nextReservationId++;
    }
    calculateTotal() {
      const duration = (this.checkOutDate - this.checkInDate) / (1000 * 60 * 60 * 24);
      return this.room.price * duration;
  }
      updateReservation(newCheckInDate, newCheckOutDate) {
        this.checkInDate = new Date(newCheckInDate);
         this.checkOutDate = new Date(newCheckOutDate);
      }
  }
  
  // customer details
  class Customer {
    constructor(customerId, name, contactInfo,) {
      this.customerId = customerId;
      this.name = name;
      this.contactInfo = contactInfo;
      this.reservation = [];
    }
    makeReservation(reservation) {
      this.reservation.push(reservation);
    }
    cancelReservation(reservation) {
    this.reservation = this.reservation.filter(res => res.reservationId !== reservation.reservationId);
  } 
    }
  
  // receptionist details
  class Receptionist {
    constructor(employeeId, name) {
      this.employeeId = employeeId
      this.name = name;
    }
  
    confirmReservation(reservation) {
      reservation.status = "confirmed";
      reservation.room.updateStatus(false);
      console.log(`Reservation ${reservation.reservationId} cancelled.` );
    }
  
    confirmReservation(reservation) {
      reservation.status = "confirmed";
    // reservation.room.updateStatus(true);
      console.log(`Reservation ${reservation.reservationId} cancelled.` );
    }
  
    checkInCustomer(reservation) {
      if (reservation.status === 'Confirmed') {
        console.log(`Room ${reservation.room.roomNumber}` + ' is checked in.');
      } else {
        console.log ('Reservation is not confirmed. Cannot check in');
      }
    }
  
    checkOutCustomer(reservation) {
      if (reservation.status === 'Confirmed') {
        reservation.room.updateStatus(true);
        console.log(`Room ${reservation.room.roomNumber}` + ' is checked out.');
      } else {
        console.log ('Reservation is not confirmed. Cannot check out');
      }
    }
  }
  
  // hotel details
  
  class Hotel {
    constructor(hotelName, location, _rooms) {
      this.hotelName = hotelName;
      this.location = location;
      this.rooms = [];
    }
  
    addRoom(room) {
      this.rooms.push(room);
    }
  
    removeRoom(room) {
     this.rooms = this.rooms.filter(r => r.roomNumber !== room.roomNumber);
    }
  
      searchRoom(roomType) {
        return this.rooms.filter(room => room.roomtype === roomType && room.checkAvailabilty());
      }
  }
  // main program 
  
  class Payment {
    static nextPaymentId = 1;
  
    constructor(paymentId, amount, paymentMethod, _paymentStatus) {
      this.paymentId = paymentId.generatePaymentId();
      this.amount = amount;
      this.paymentMethod = paymentMethod;
      this.paymentStatus = 'Pending';
    }
  
    static generatePaymentId() {
      return this.nextPaymentId++;
    }
  
    processPayment() {
      this.paymentStatus = 'paid';
    }
    refundPayment() {
      this.paymentStatus = 'refunded';
    }
  }
  
  // Test the classes
  
  const hotel = new Hotel("Delly Resort", "warri");
  
  // create rooms
  
  const room1 = new room(101, "single", 100);
  const room2 = new room(103, "single", 180);
  hotel.addRoom(room1);
  hotel.addRoom(room2);
  
  // create customer
  
  const customer1 = new Customer(1, "destiny Orumade", "+23498803323");
  
  // create receptionist 
  
  const receptionist1 = new Receptionist(101,"adewale");
  
  // searching rooms
  
  const availableRooms = hotel.searchRoom("single");
  console.log("Available rooms:" + availableRooms.map(room => room.roomNumber).join(","));
  
  // make reservation 
  const roomToBook = availableRooms[0];
  const reservation = new Reservation("2023-07-01", "2023-07-05", roomToBook); 
  
  // confirm reservation 
  receptionist1.confirmReservation(reservation);

//process payment
//   const payment = new Payment(reservation.calculateTotal(), "Credi Card");
//   payment.processPayment();
  // check in customer
  
  receptionist1.checkInCustomer(reservation);
  
  // check out customer
  
  receptionist1.checkOutCustomer(reservation);
  
  //payment statu§s
  
  console.log("Payment status: " + Payment.paymentStatus);


  