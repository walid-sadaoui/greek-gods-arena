import request from 'supertest';
import app from '../../../../index';
import config from '../../../../config';
import * as db from '../../../../common/testUtils/database';
import * as DataFactory from '../../../../common/testUtils/dataFactory';
import Character from '../characterSchema';
import { IUser } from '../../userModel';
// import * as CharacterDM from '../characterDataManager';
import * as UserDM from '../../userDataManager';

config.nodeEnv = 'test';

let token: string;
let userId: string;

beforeAll(async () => await db.connect());
beforeEach(async () => {
  const userInfo: IUser = await DataFactory.createUser();
  const loginResponse = await request(app)
    .post(`/login`)
    .send({ email: userInfo.email, password: userInfo.password });
  token = loginResponse.body.data.token;
  userId = loginResponse.body.data.user._id;
});
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('Characters', () => {
  // describe('Get Characters : GET /users/:id/characters', () => {
  //   test('When user logged in, should return the list of characters the user owns and return 200', async () => {
  //     const currentUser = await UserDM.getUser(userId);
  //     const getCharactersResponse = await request(app)
  //       .get(`/users/${userId}/characters`)
  //       .set('Authorization', `Bearer ${token}`);
  //     expect(getCharactersResponse).toBeTruthy();
  //     expect(getCharactersResponse.status).toBe(200);
  //     expect(getCharactersResponse.body.data.message).toBe(
  //       `${currentUser.characters.length} characters found !`
  //     );
  //     expect(getCharactersResponse.body.data.code).toBe(200);
  //     expect(getCharactersResponse.body.data.characters.length).toBe(
  //       currentUser.characters.length
  //     );
  //   });
  //   test('When user not authenticated, should throw Error and return 401', async () => {
  //     const getCharactersResponse = await request(app).get(
  //       `/users/${userId}/characters`
  //     );

  //     expect(getCharactersResponse).toBeTruthy();
  //     expect(getCharactersResponse.status).toBe(401);
  //     expect(getCharactersResponse.body.error.message).toBe(
  //       'No token provided'
  //     );
  //   });
  //   test('When request params id different than logged user id, should throw Error and return 401', async () => {
  //     const secondUser = await DataFactory.createUser();
  //     const getCharactersResponse = await request(app)
  //       .get(`/users/${secondUser._id}/characters`)
  //       .set('Authorization', `Bearer ${token}`);
  //     expect(getCharactersResponse).toBeTruthy();
  //     expect(getCharactersResponse.status).toBe(401);
  //     expect(getCharactersResponse.body.error.message).toBe(
  //       `You are not authorized to access these datas !`
  //     );
  //   });
  // });
  describe('Get Character : GET /users/:id/characters/:characterName', () => {
    test('When user logged in, should return the list of characters the user owns and return 200', async () => {
      const currentUser = await UserDM.getUser(userId);
      const getCharacterResponse = await request(app)
        .get(`/users/${userId}/characters/${currentUser.characters[0].name}`)
        .set('Authorization', `Bearer ${token}`);

      const characterRetrieved = new Character({
        name: currentUser.characters[0].name,
      });
      expect(getCharacterResponse).toBeTruthy();
      expect(getCharacterResponse.status).toBe(200);
      expect(getCharacterResponse.body.data.message).toBe(
        `Character ${currentUser.characters[0].name} found !`
      );
      expect(getCharacterResponse.body.data.code).toBe(200);
      expect(getCharacterResponse.body.data.character).toEqual({
        ...characterRetrieved.toObject(),
        _id: getCharacterResponse.body.data.character._id,
      });
    });
    // test('When user not authenticated, should throw Error and return 401', async () => {
    //   const currentUser = await UserDM.getUser(userId);
    //   const getCharacterResponse = await request(app).get(
    //     `/users/${userId}/characters/${currentUser.characters[0].name}`
    //   );

    //   expect(getCharacterResponse).toBeTruthy();
    //   expect(getCharacterResponse.status).toBe(401);
    //   expect(getCharacterResponse.body.error.message).toBe('No token provided');
    // });
    // test('When request params id different than logged user id, should throw Error and return 401', async () => {
    //   const currentUser = await UserDM.getUser(userId);
    //   const secondUser = await DataFactory.createUser();

    //   const getCharacterResponse = await request(app)
    //     .get(
    //       `/users/${secondUser._id}/characters/${currentUser.characters[0].name}`
    //     )
    //     .set('Authorization', `Bearer ${token}`);

    //   expect(getCharacterResponse).toBeTruthy();
    //   expect(getCharacterResponse.status).toBe(401);
    //   expect(getCharacterResponse.body.error.message).toBe(
    //     `You are not authorized to access these datas !`
    //   );
    // });
    // test('When invalid Greek God name provided, should throw Error and return 422', async () => {
    //   const getCharacterResponse = await request(app)
    //     .get(`/users/${userId}/characters/invalidGreekGod`)
    //     .set('Authorization', `Bearer ${token}`);

    //   expect(getCharacterResponse).toBeTruthy();
    //   expect(getCharacterResponse.status).toBe(422);
    //   expect(getCharacterResponse.body.error.message).toBe(
    //     `You need to provide a valid Greek God name !`
    //   );
    // });
  });
  // describe('Update Character : POST /users/:id/characters/:characterName', () => {
  //   test('When user logged in and valid character skills values, should update the character specified with the new values and return 200', async () => {
  //     const currentUser = await UserDM.getUser(userId);
  //     await DataFactory.updateCharacter(userId, currentUser.characters[0].name);

  //     const updatedCharacterValues = {
  //       health: 22,
  //       attack: 14,
  //       defense: 15,
  //       magik: 5,
  //     };

  //     const updateCharacterResponse = await request(app)
  //       .post(`/users/${userId}/characters/${currentUser.characters[0].name}`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(updatedCharacterValues);

  //     expect(updateCharacterResponse).toBeTruthy();
  //     expect(updateCharacterResponse.status).toBe(200);
  //     expect(updateCharacterResponse.body.data.message).toBe(
  //       `Character ${currentUser.characters[0].name} updated !`
  //     );
  //     expect(updateCharacterResponse.body.data.code).toBe(200);
  //     expect(updateCharacterResponse.body.data.character).toEqual({
  //       ...updatedCharacterValues,
  //       _id: updateCharacterResponse.body.data.character._id,
  //       name: currentUser.characters[0].name,
  //       level: currentUser.characters[0].level,
  //       skillPoints: 28,
  //     });
  //   });
  //   test('When user not authenticated, should throw Error and return 401', async () => {
  //     const currentUser = await UserDM.getUser(userId);
  //     await DataFactory.updateCharacter(userId, currentUser.characters[0].name);

  //     const updatedCharacterValues = {
  //       health: 22,
  //       attack: 14,
  //       defense: 15,
  //       magik: 5,
  //     };

  //     const updateCharacterResponse = await request(app)
  //       .post(`/users/${userId}/characters/${currentUser.characters[0].name}`)
  //       .send(updatedCharacterValues);

  //     expect(updateCharacterResponse).toBeTruthy();
  //     expect(updateCharacterResponse.status).toBe(401);
  //     expect(updateCharacterResponse.body.error.message).toBe(
  //       'No token provided'
  //     );
  //   });
  //   test('When request params id different than logged user id, should throw Error and return 401', async () => {
  //     const currentUser = await UserDM.getUser(userId);
  //     const secondUser = await DataFactory.createUser();

  //     await DataFactory.updateCharacter(userId, currentUser.characters[0].name);

  //     const updatedCharacterValues = {
  //       health: 22,
  //       attack: 14,
  //       defense: 15,
  //       magik: 5,
  //     };

  //     const updateCharacterResponse = await request(app)
  //       .post(
  //         `/users/${secondUser._id}/characters/${currentUser.characters[0].name}`
  //       )
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(updatedCharacterValues);

  //     expect(updateCharacterResponse).toBeTruthy();
  //     expect(updateCharacterResponse.status).toBe(401);
  //     expect(updateCharacterResponse.body.error.message).toBe(
  //       `You are not authorized to access these datas !`
  //     );
  //   });
  //   test('When invalid Greek God name provided, should throw Error and return 422', async () => {
  //     const currentUser = await UserDM.getUser(userId);
  //     await DataFactory.updateCharacter(userId, currentUser.characters[0].name);

  //     const updatedCharacterValues = {
  //       health: 22,
  //       attack: 14,
  //       defense: 15,
  //       magik: 5,
  //     };

  //     const updateCharacterResponse = await request(app)
  //       .post(`/users/${userId}/characters/invalidGreekGod`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(updatedCharacterValues);

  //     expect(updateCharacterResponse).toBeTruthy();
  //     expect(updateCharacterResponse.status).toBe(422);
  //     expect(updateCharacterResponse.body.error.message).toBe(
  //       `You need to provide a valid Greek God name !`
  //     );
  //   });
  //   test('When invalid new skill values provided, should throw error and return 400', async () => {
  //     const currentUser = await UserDM.getUser(userId);
  //     await DataFactory.updateCharacter(userId, currentUser.characters[0].name);

  //     const updatedCharacterValues = {
  //       health: 0,
  //       attack: -2,
  //       defense: 15,
  //       magik: 5,
  //     };

  //     const updateCharacterResponse = await request(app)
  //       .post(`/users/${userId}/characters/${currentUser.characters[0].name}`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(updatedCharacterValues);

  //     expect(updateCharacterResponse).toBeTruthy();
  //     expect(updateCharacterResponse.status).toBe(400);
  //     expect(updateCharacterResponse.body.error.message).toBe(
  //       `You cannot have negative values for attack, defense, health and magik !`
  //     );
  //   });
  //   test('When character has 0 skillPoint, should cancel update, throw error and return 400', async () => {
  //     let currentUser = await UserDM.getUser(userId);
  //     const updatedCharacterProperties = {
  //       skillPoints: 0,
  //       health: 22,
  //       attack: 14,
  //       defense: 15,
  //       magik: 5,
  //       level: 1,
  //     };
  //     const characterBeforeUpdate = await CharacterDM.updateCharacter(
  //       currentUser,
  //       currentUser.characters[0].name,
  //       updatedCharacterProperties
  //     );
  //     const updatedCharacterValues = {
  //       health: 22,
  //       attack: 14,
  //       defense: 15,
  //       magik: 5,
  //     };

  //     const updateCharacterResponse = await request(app)
  //       .post(`/users/${userId}/characters/${currentUser.characters[0].name}`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(updatedCharacterValues);

  //     currentUser = await UserDM.getUser(userId);
  //     const characterNotUpdated = await CharacterDM.getCharacterByName(
  //       currentUser,
  //       currentUser.characters[0].name
  //     );

  //     expect(updateCharacterResponse).toBeTruthy();
  //     expect(updateCharacterResponse.status).toBe(400);
  //     expect(updateCharacterResponse.body.error.message).toBe(
  //       `Your character has 0 skillPoints, it cannot be updated`
  //     );
  //     expect(characterNotUpdated).toEqual(characterBeforeUpdate);
  //   });
  //   test('When not enough skillPoints to update the character, should  cancel update, throw error and return 400', async () => {
  //     const currentUser = await UserDM.getUser(userId);
  //     await DataFactory.updateCharacter(userId, currentUser.characters[0].name);

  //     const updatedCharacterValues = {
  //       skillPoints: 21,
  //       health: 22,
  //       attack: 100,
  //       defense: 15,
  //       magik: 5,
  //     };

  //     const updateCharacterResponse = await request(app)
  //       .post(`/users/${userId}/characters/${currentUser.characters[0].name}`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(updatedCharacterValues);

  //     expect(updateCharacterResponse).toBeTruthy();
  //     expect(updateCharacterResponse.status).toBe(400);
  //     expect(updateCharacterResponse.body.error.message).toBe(
  //       `You used more skillPoints than your character can use !`
  //     );
  //   });
  // });
});
