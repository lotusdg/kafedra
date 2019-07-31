const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAhxLhJhfb6CM4nT1LQACF3nHCQ2pVoi4Uj20x1xfDdtCIFofJ
1ER6VYaFvLO1l8Q0EBQ/Kl/4021ExT5ChIlhKgQDzdyOXUuNl4Iayio/9YbhOT0L
N2zTZ9jCJjgd53aXilyneCYh0ddsYlDovLSvo4USa6f2IwWYlm7/a0O14TMD+Xv5
e6XumJor6NiVrIk6tVakwSVt5xc0VqkuJ7Oo2Wf+iWnBPpC0A5ZZFUtVPw0gp10t
06zcyZdt8tHtMPXkHu9vfJOJa4j5/e3KOm+/uX3hAoIr7f5VDo5FsM/yUstywCv3
hi0m7Rxvb5mCyx5vIMVwcS6CC5baWGbTE06gNQIDAQABAoIBAHjYsUstiXe1G0/C
qPKIBT0xNgauuhKxe3+eyDqSbjR8+WR+9FnPMkwWYMylU9CGn7XLB4BYAPzYA/Ec
dNKzPpUipmyl6VEa6YEly+YXysVWeWaGcOSTnsiIK5uaFVciyQ3nO4XJR/S/8Z48
mR1L4uA/jG15BkPrG8trX2WOXMkvTWQL7WjQqtBT3N5SvAAJkY3cqGPotSA0rHKz
6RjMZwZSiLnq9Q+Hj74bU/1MqX2Hpbof5soJBZmuUa5dryB0px/7DaZOYcnr6QKH
U1LuZvRxWvdAroPK0oJjFuvyizif9hHOtT45H+Fxk/cxszC7Hnkn0Avw9PW5mvG4
2lraUHkCgYEA8PSIRFMIJj7kaaLvPWsaBXOJrEEm+TmHlIIXkVpaoQE5dG4vFprx
KDUmOaBmryS8NYz2g8jLVDlli0UX0L2LKANUMO7KT0ijE61Ul9SuYYdnOGJ7V6Ib
2aOCb9ky0kfsuTQRQM4y6/e1lkGCho3uHGTdmxv7Mnv8V1oklHhImjMCgYEAj4Hr
qLQRdXXt5rqcB212tfHrDUM0bLFcQlIVO5xCBbF06njkNJZZAJvfznRgB8wNwQhe
7G7mUfv+UPZmClTAKcEmQvUoK9Kx1+VrMlXSBUgH8FtgTLyX35i+RVIlOlRu3zFJ
aJsL2e7xPOFTuW+xrzt43DBJCofLaKJCBGX/w/cCgYAA6HsG/uUd98i2mTWbnqa3
dIsFSi2SbOQU7DSYiKWky7Niu/OTezwDccfWGcOpT1MiRIi9UGlrxNecIcOINt6q
ZPDRSmUazWRH87RI6jVKCs+Zx809NFA0jsg0EbZ+UmUTAZ47B0vr1cAqc87BIRHP
q5WmOwHEW/FEhwNyR83GPwKBgHjo3NXCCWeu2adpmKaFatx3HDSLZ/MgJ/xUzkDw
MYw8bKZU/ujzt79UlWeME5DeMsRtuhR4h6ORrj8mquiPaWyEqSkHBzaNCXw+dmft
eMssWkv/oQ5mY4tnVQBw6p7Pnq58Bz6US5Ltx+Ekc/csDUf30qeqIxA1Q4NAGmE8
UxcXAoGBANxbNGdxlgoroPHIoLP6lPB04ToDlh8ctuCqRnKVmszTNJFNkgYJzX9a
oQKQnw92xU4u+RINu+unK/UgDgY93mcWrax8uNBPfh83o5zj908hBgRGkkU8Luxz
k2PlIY4BnBMb+a7mQams0TB4rL/1Z3SMTgepkjJx9+Dxw9grvU1b
-----END RSA PRIVATE KEY-----`;

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhxLhJhfb6CM4nT1LQACF
3nHCQ2pVoi4Uj20x1xfDdtCIFofJ1ER6VYaFvLO1l8Q0EBQ/Kl/4021ExT5ChIlh
KgQDzdyOXUuNl4Iayio/9YbhOT0LN2zTZ9jCJjgd53aXilyneCYh0ddsYlDovLSv
o4USa6f2IwWYlm7/a0O14TMD+Xv5e6XumJor6NiVrIk6tVakwSVt5xc0VqkuJ7Oo
2Wf+iWnBPpC0A5ZZFUtVPw0gp10t06zcyZdt8tHtMPXkHu9vfJOJa4j5/e3KOm+/
uX3hAoIr7f5VDo5FsM/yUstywCv3hi0m7Rxvb5mCyx5vIMVwcS6CC5baWGbTE06g
NQIDAQAB
-----END PUBLIC KEY-----`;

class authService {

    static authenticate(data){
        const UserService = require('../users/userService');
        const userService = new UserService();

        let user = userService.getAll().find(u => data.name === u.name);
        if (!user || !authService.checkPass(data.pass, user.pass)) return null;

       return{token:authService.createToken(user)};
    }

    static hash(pass) {
        return bcrypt.hashSync(pass, 10);
    }

    static checkPass(pass, hash) {
        return bcrypt.compareSync(pass, hash);
    }

    static createToken(payload) {
        const options = {
            algorithm: 'RS256'
        };
        return jwt.sign(payload, PRIVATE_KEY, options)
    }

    static decodeToken(token) {
        return jwt.verify(token, PUBLIC_KEY)
    }
}



module.exports = authService;

