# Naboo interview

## What's used ?

backend

- mongodb
- nestjs
- mongoose
- data mapper pattern

frontend

- nextjs (with page router)
- mantine-ui
- axios

## How to launch project ?

prerequisite

- docker with docker-compose

backend

```bash
yarn

# terminal 1 - run database
yarn start:db

# terminal 2
yarn start:dev
```

frontend

```bash
yarn

yarn dev
```

## Possible improvements

- Migrate to monorepo or something else to be able to share types between back and front easily
- Add more tests, maybe with test database
- and surely others !

## Todo

- [ ] Home page with 3 activities
- [x] Explorer, list activity city
- [x] Explorer[city], show activities
- [ ] Explorer[city], filter activities
- [ ] Profil page
- [ ] Add seeds
- [ ] Add tests
- [ ] check design
- [ ] share types between front and back
