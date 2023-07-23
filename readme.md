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
- vitest

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

## Connection informations

email: user1@test.fr
password: user1

## Possible improvements

- Migrate to monorepo or something else to be able to share types between back and front easily
- Add more tests, maybe with test database
- and surely others !

## Todo

- [x] Home page with 3 activities
- [x] Explorer, list activity city
- [x] Explorer[city], show activities
- [x] Explorer[city], filter activities
- [x] Profil page
- [x] Page mes activités
- [x] Add seeds
- [-] Add tests
- [x] check design
- [ ] Turn some pages into modal
- [ ] Framer for animations
- [ ] share types between front and back
