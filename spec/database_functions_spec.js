const {
  addNewVisitor,
  createTable,
  deleteAVisitor,
  updateAVisitor,
  deleteAllVisitors,
  viewLastVisitor,
  listAllVisitors,
  viewOneVisitor,
} = require("../src/database_functions");
const { pool } = require("../src/db_config");
const { queryObject, successMessages } = require("../src/helper_objects");
const {
  errorMessages,
  stringObject,
  databaseErrors,
} = require("../src/helper_objects");

describe("Visitors System", () => {
  describe("addNewVisitor", () => {
    it("should add a new visitor", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({}));
      pool.query = mockQuery;
      const newVisitor = addNewVisitor(
        "Joseph Malete",
        27,
        "05-12-2023",
        "11:23",
        "Thabo",
        "I enjoy being here"
      );
      await newVisitor;

      expect(mockQuery).toHaveBeenCalledOnceWith(queryObject.insertValues, [
        "Joseph Malete",
        27,
        "05-12-2023",
        "11:23",
        "Thabo",
        "I enjoy being here",
      ]);
      expect(await newVisitor).toBe(successMessages.newVisitorAdded);
    });

    it("should throw an error if visitor's name is empty", async () => {
      await expectAsync(
        addNewVisitor(
          "",
          27,
          "05-12-2023",
          "11:23",
          "Thabo",
          "I enjoy being here"
        )
      ).toBeRejectedWith(new Error(errorMessages.empty(stringObject.name)));
    });

    it("should throw an error if visitor's age is empty", async () => {
      await expectAsync(
        addNewVisitor(
          "Joseph Malete",
          "",
          "05-12-2023",
          "11:23",
          "Thabo",
          "I enjoy being here"
        )
      ).toBeRejectedWith(new Error(errorMessages.empty(stringObject.age)));
    });

    it("should throw an error if date is empty", async () => {
      await expectAsync(
        addNewVisitor(
          "Joseph Malete",
          27,
          "",
          "11:23",
          "Thabo",
          "I enjoy being here"
        )
      ).toBeRejectedWith(new Error(errorMessages.empty(stringObject.date)));
    });

    it("should throw an error if time is empty", async () => {
      await expectAsync(
        addNewVisitor(
          "Joseph Malete",
          27,
          "05-12-2023",
          "",
          "Thabo",
          "I enjoy being here"
        )
      ).toBeRejectedWith(new Error(errorMessages.empty(stringObject.time)));
    });

    it("should throw an error if assistant's name is empty", async () => {
      await expectAsync(
        addNewVisitor("Joseph Malete", 27, "05-12-2023", "11:23", "", "Thabo")
      ).toBeRejectedWith(
        new Error(errorMessages.empty(stringObject.assistant))
      );
    });

    it("should throw an error if visitor's name is not a string", async () => {
      await expectAsync(
        addNewVisitor(
          123,
          27,
          "05-12-2023",
          "11:23",
          "Thabo",
          "I enjoy being here"
        )
      ).toBeRejectedWith(
        new Error(errorMessages.isNotAString(stringObject.name))
      );
    });

    it("should throw an error if visitor's name contains initials", async () => {
      await expectAsync(
        addNewVisitor(
          "JJ Malete",
          27,
          "05-12-2023",
          "11:23",
          "Thabo",
          "I enjoy being here"
        )
      ).toBeRejectedWith(new Error(errorMessages.containsInitials));
    });

    /* it("should throw an error if visitor's age is not a number", async () => {
      await expectAsync(
        addNewVisitor("Joseph Malete", "twenty seven", "05-12-2023", "11:23", "Thabo", "I enjoy being here")
      ).toBeRejectedWith(new Error(errorMessages.isNotNumber));
    });*/

    it("should throw an error for incorrect date format", async () => {
      await expectAsync(
        addNewVisitor(
          "Joseph Malete",
          27,
          "05-12-20233",
          "11:23",
          "Thabo",
          "I enjoy being here"
        )
      ).toBeRejectedWith(
        new Error(errorMessages.invalidFormat(stringObject.date))
      );
    });
  });

  describe("createTable", () => {
    it("should create a table", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({}));
      pool.query = mockQuery;
      const table = createTable();
      await table;

      expect(mockQuery.calls.allArgs()).toEqual([[queryObject.createTable]]);
      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(await table).toBe(successMessages.tableCreated);
    });
  });

  describe("deleteAVisitor", () => {
    it("should delete a visitor", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({ rows: [{ id: 1 }] }));
      pool.query = mockQuery;
      const deleteVisitor = deleteAVisitor(1);
      await deleteVisitor;

      expect(mockQuery.calls.allArgs()).toEqual([
        [queryObject.checkVisitor, [1]],
        [queryObject.deleteVisitor, [1]],
      ]);
      expect(mockQuery).toHaveBeenCalledTimes(2);
      expect(await deleteVisitor).toBe(successMessages.visitorDeleted);
    });
  });

  describe("updateAVisitor", () => {
    it("should update a visitor", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({ rows: [{ id: 1 }] }));
      pool.query = mockQuery;
      const updatedVisitor = updateAVisitor(
        1,
        "full_name",
        "Joseph Jacob Malete"
      );
      await updatedVisitor;

      expect(mockQuery).toHaveBeenCalledWith(queryObject.update("full_name"), [
        "Joseph Jacob Malete",
        1,
      ]);
      expect(mockQuery).toHaveBeenCalledTimes(2);
      expect(await updatedVisitor).toBe(successMessages.visitorUpdated);
    });

    it("should throw an error if you try to update a visitor that does not exist", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({ rows: [] }));
      pool.query = mockQuery;
      await expectAsync(
        updateAVisitor(1, "full_name", "Joseph Jacob Malete")
      ).toBeRejectedWith(new Error(databaseErrors.visitorDoesNotExist(1)));
    });
  });

  describe("deleteAllVisitors", () => {
    it("should delete all visitors", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValues(
          Promise.resolve({ rows: [{ id: 1 }] }),
          Promise.resolve({})
        );
      pool.query = mockQuery;

      const deleteVisitors = deleteAllVisitors();
      await deleteVisitors;

      expect(mockQuery).toHaveBeenCalledWith(queryObject.listAll);
      expect(mockQuery).toHaveBeenCalledWith(queryObject.deleteAll);
      expect(mockQuery).toHaveBeenCalledTimes(2);
      expect(await deleteVisitors).toBe(successMessages.allVisitorsDeleted);
    });

    it("should throw an error when you try to delete all visitors if the table is empty", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValues(Promise.resolve({ rows: [] }), Promise.resolve({}));
      pool.query = mockQuery;
      await expectAsync(deleteAllVisitors()).toBeRejectedWith(
        new Error(databaseErrors.deletingAll)
      );
    });
  });

  describe("viewLastVisitor", () => {
    it("should view the last visitor", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValues(
          Promise.resolve({ rows: [{ id: 1 }] }),
          Promise.resolve({ rows: [{ id: 2 }] })
        );
      pool.query = mockQuery;
      const result = await viewLastVisitor();

      expect(result).toEqual([{ id: 2 }]);
      expect(mockQuery).toHaveBeenCalledWith(queryObject.listAll);
      expect(mockQuery).toHaveBeenCalledWith(queryObject.viewLast);
      expect(mockQuery).toHaveBeenCalledTimes(2);
    });

    it("should throw an error when you try to view last visitor if the table is empty", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValues(
          Promise.resolve({ rows: [] }),
          Promise.resolve({ rows: [{ id: 2 }] })
        );
      pool.query = mockQuery;
      await expectAsync(viewLastVisitor()).toBeRejectedWith(
        new Error(databaseErrors.viewingLast)
      );
    });
  });

  describe("listAllVisitors", () => {
    it("should list all visitors", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({ rows: [{ id: 1 }, { id: 2 }] }));
      pool.query = mockQuery;
      const result = await listAllVisitors();

      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
      expect(mockQuery).toHaveBeenCalledOnceWith(queryObject.listAll);
    });

    it("should throw an error when you try to list all visitors if the table is empty", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({ rows: [] }));
      pool.query = mockQuery;
      await expectAsync(listAllVisitors()).toBeRejectedWith(
        new Error(databaseErrors.listingVisitors)
      );
    });
  });

  describe("viewOneVisitor", () => {
    it("should view one visitor", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({ rows: [{ id: 1 }] }));
      pool.query = mockQuery;
      const result = await viewOneVisitor(1);

      expect(result).toEqual([{ id: 1 }]);
      expect(mockQuery).toHaveBeenCalledOnceWith(queryObject.viewOne, [1]);
    });

    it("should throw an error if you try to view a visitor that does not exist", async () => {
      const mockQuery = jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({ rows: [] }));
      pool.query = mockQuery;
      await expectAsync(viewOneVisitor(2)).toBeRejectedWith(
        new Error(databaseErrors.visitorDoesNotExist(2))
      );
    });
  });
});
