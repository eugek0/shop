import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigService } from '@nestjs/config';

import { IDevice, ITemplate } from '@common/types';

export const transportConstructor = async (cs: ConfigService) => ({
  transport: `smtps://${cs.get<string>('MAILER_USER')}:${cs.get<string>(
    'MAILER_PASS',
  )}@${cs.get<string>('MAILER_HOST')}`,
  defaults: {
    from: `"${cs.get<string>('MAILER_SIGNATURE')}" ${cs.get<string>(
      'MAILER_USER',
    )}`,
  },
  template: {
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
});

export const messageConfirmationRegistration = (
  name = 'Пользователь',
): string => {
  const message: ITemplate = {
    title: `Здравствуйте, ${name}`,
    subTitle: 'Ваша учетная запись была успешно подтверждена',
    description:
      'Если Вы не регистрировали учетную запись, сообщите нам об этом.',
    content: getContentConfirmation(),
  };

  return template(message);
};

export const messageNewCode = (code: string, name = 'Здравствуйте'): string => {
  const message: ITemplate = {
    title: `${name}, Вы запросили новый код подтверждения`,
    subTitle: 'Используйте этот код для подтверждения регистрации',
    description: 'Код действителен 15 минут',
    content: getCodeContent(code),
  };

  return template(message);
};

export const messageTemplate = (
  code: string,
  name = 'Здравствуйте',
): string => {
  const message: ITemplate = {
    title: `${name}, Вы отправили заявку на регистрацию`,
    subTitle: 'Используйте этот код для подтверждения регистрации',
    description: 'Код действителен 15 минут',
    content: getCodeContent(code),
  };

  return template(message);
};

export const messageLogin = (
  device: IDevice,
  name = 'Здравствуйте',
): string => {
  const message: ITemplate = {
    title: `${name}, в Вашу учетную запись был выполнен вход`,
    subTitle: 'Если вход выполнили не вы, то смените пароль',
    description: 'Информация об устройстве, с которого выполнен вход',
    content: getContentByDevice(device),
  };

  return template(message);
};

export const messageOrder = (name = 'Здравствуйте', order) => {
  const message: ITemplate = {
    title: `${name}, вы сделали заказ.`,
    subTitle: 'Благодарим вас за оформление',
    description: `Информация о заказе`,
    content: getOrderContent(order),
    blocks: getBlocksOrder(order.products),
  };

  return template(message);
};

export const getCodeContent = (code) => {
  return `<tr>
                              <td align="center" bgcolor="#ffffff" height="62"
                                  nowrap="nowrap"
                                  style="height: 62px;background-color: rgb(255, 255, 255);border: 1px solid rgb(255, 255, 255);display: block;border-radius: 8px;mso-padding-alt:0 28px;"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 24px;line-height: 62px;color: #000000;white-space: nowrap;text-decoration: none;font-weight: bold;text-transform: uppercase;letter-spacing: 0.02em;display: block;padding: 0 28px;"
                                >${code}</span>
                              </td>
                            </tr>`;
};

export const getContentByDevice = (device: IDevice) => {
  const notFound = 'Не определенно';
  const city = device.city || notFound;
  const country = device.country || notFound;
  const region = device.region || notFound;
  const ip = device.ip || notFound;
  const app = device.app || notFound;
  const os = device.os || notFound;

  return `<tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;font-weight: bold;text-transform: uppercase;letter-spacing: 0.02em;display: block;"
                                > ◉ Страна: ${country}</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;font-weight: bold;text-transform: uppercase;letter-spacing: 0.02em;display: block;"
                                > ◉ Регион: ${region}</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;font-weight: bold;text-transform: uppercase;letter-spacing: 0.02em;display: block;"
                                > ◉ Город: ${city}</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;font-weight: bold;text-transform: uppercase;letter-spacing: 0.02em;display: block;"
                                > ◉ Приложение: ${app}</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;font-weight: bold;text-transform: uppercase;letter-spacing: 0.02em;display: block;"
                                > ◉ Операционная система: ${os}</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;font-weight: bold;text-transform: uppercase;letter-spacing: 0.02em;display: block;"
                                > ◉ IP: ${ip}</span>
                              </td>
                            </tr>`;
};

export const getContentConfirmation = () => {
  return `<tr>
              <td align="center" bgcolor="#ffffff" height="62"
                 nowrap="nowrap"
                 style="height: 62px;background-color: rgb(255, 255, 255);border: 1px solid rgb(255, 255, 255);display: block;border-radius: 8px;mso-padding-alt:0 28px;"
                 valign="middle">
                    <a href="https://t.me/U_PROJECT_STUDIO" style="text-decoration: none">
                       <span style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 24px;line-height: 62px;color: #000000;white-space: nowrap;text-decoration: none;font-weight: bold;text-transform: uppercase;letter-spacing: 0.02em;display: block;padding: 0 28px;">
                          Сообщить
                       </span>
                    </a> 
             </td>                                 
           </tr>`;
};

export const getOrderContent = (order) => {
  const notFound = 'Не определенно';

  const { recipient } = order;

  const fio = `${recipient.lastName || ''} ${recipient.firstName || ''} ${
    recipient.middleName || ''
  }`;
  const email = recipient.email || notFound;
  const phone = recipient.phone || notFound;

  const status = order?.status?.title || notFound;
  const delivery = order?.delivery?.title || notFound;
  const payment = order?.payment?.title || notFound;
  const totalPrice = order?.totalPrice || notFound;
  const totalPriceDiscount = order?.totalPriceDiscount || 0;
  const totalPriceWithDiscount = order?.totalPriceWithDiscount || notFound;

  return `                  <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 18px;color: #ffffff;white-space: nowrap;text-decoration: none;text-transform: uppercase;font-weight: bold;letter-spacing: 0.02em;display: block;"
                                > Стоимость </span>
                              </td>
                            </tr>
                            <tr>
                               <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;padding-left: 20px;letter-spacing: 0.02em;display: block;"
                                >  Цена: ${totalPrice}, руб</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;padding-left: 20px;letter-spacing: 0.02em;display: block;"
                                > Цена со скидкой: ${totalPriceWithDiscount}, руб</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;padding-left: 20px;letter-spacing: 0.02em;display: block;"
                                > Скидка: ${totalPriceDiscount}, руб</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;margin-top: 20px;margin-bottom: 6px; font-size: 18px;color: #ffffff;white-space: nowrap;text-decoration: none;text-transform: uppercase;font-weight: bold;letter-spacing: 0.02em;display: block;"
                                > Получатель </span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;padding-left: 20px;letter-spacing: 0.02em;display: block;"
                                > ФИО: ${fio}</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;padding-left: 20px;letter-spacing: 0.02em;display: block;"
                                > Почта: ${email}</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;padding-left: 20px;letter-spacing: 0.02em;display: block;"
                                > Номер телефона: ${phone}</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 18px; margin-top: 20px; margin-bottom: 6px; color: #ffffff;white-space: nowrap;text-decoration: none;text-transform: uppercase;font-weight: bold;letter-spacing: 0.02em;display: block;"
                                > Доставка и Оплата </span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;padding-left: 20px;letter-spacing: 0.02em;display: block;"
                                > Способ доставки: ${delivery}</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;padding-left: 20px;letter-spacing: 0.02em;display: block;"
                                > Способ оплаты: ${payment}</span>
                              </td>
                            </tr>
                            <tr>
                              <td background="#black" height="32"
                                  nowrap="nowrap"
                                  valign="middle">
                                <span
                                    style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;color: #ffffff;white-space: nowrap;text-decoration: none;padding-left: 20px;letter-spacing: 0.02em;display: block;"
                                > Статус заказа: ${status}</span>
                              </td>
                            </tr>
                            `;
};

export const getBlocksOrder = (rawProducts) => {
  const baseUrl = `https://u-project-studio.ru`;
  const getProductUrl = (id) => `${baseUrl}/catalog/${id}`;

  const getImageUrl = (name) => `${baseUrl}/api/files/${name}`;

  const products = rawProducts.map((product) => product.toJSON());

  return products.reduce(
    (
      acc,
      {
        price,
        priceWithDiscount,
        count,
        product: { id, preview, title, motive, volume, gender },
      },
    ) => {
      const previewPrice = priceWithDiscount || price;
      return (
        acc +
        `
        <tr>
            <td align="center" bgcolor="#ffffff" style="background-color: #ffffff;overflow: hidden;padding: 20px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" style="max-width: 520px;border-spacing: 0px;" width="100%">
                    <tbody>
                        <tr>
                            <td align="center" style="padding-bottom: 16px;">
                                <a href="${getProductUrl(
                                  id,
                                )}" target="_blank" rel=" noopener noreferrer">
                                    <img alt="image" border="0" src="${getImageUrl(
                                      preview,
                                    )}" style="display: block;width: 100%;max-width: 520px;" width="520">
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 28px;line-height: 34px;padding-bottom: 12px;font-weight: bold;">
                                <a href="${getProductUrl(
                                  id,
                                )}" style="color: #222222;text-decoration: none;" target="_blank" rel=" noopener noreferrer">
                                    <span style="text-decoration: none;">
                                        ${title} ${volume.title} × ${count}
                                    </span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;font-weight: bold; text-transform: uppercase;line-height: 24px;color: #222222;padding-bottom: 24px;">
                                ${motive.title}
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;font-weight: bold; text-transform: uppercase;line-height: 24px;color: #222222;padding-bottom: 24px;">
                                ${gender.title}
                            </td>
                        </tr>
                        <tr>
                            <td align="left">
                                <table border="0" cellpadding="0" cellspacing="0" style="width: 100px;border-spacing: 0px;" width="100">
                                    <tbody>
                                        <tr>
                                            <td align="center" bgcolor="black" height="62" nowrap="nowrap" style="height: 62px;background-color: black;border: 1px solid black;display: block;border-radius: 8px;mso-padding-alt: 0 28px;" valign="middle">
                                                <span style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 18px;line-height: 62px;color: white;white-space: nowrap;text-decoration: none;font-weight: bold;letter-spacing: 0.02em;display: block;padding: 0 28px;">
                                                    ${previewPrice} Руб
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
  `
      );
    },
    '',
  );
};

const template = (message: ITemplate) => {
  const {
    title = '',
    subTitle = '',
    description = '',
    content = '',
    blocks = '',
  } = message;

  return `
<div align="center"
     style="line-height: normal;word-break: normal;-webkit-text-size-adjust: none;-ms-text-size-adjust: none;">
  <table border="0" cellpadding="0" cellspacing="0" style="line-height: normal;" width="100%">
    <tbody>
    <tr>
      <td align="center" bgcolor="#f5f5f5"
          style="background-color:#f5f5f5;background-color:#f5f5f5;background-color:#f5f5f5;padding: 0 5px;">
        <table border="0" cellpadding="0" cellspacing="0" style="max-width: 600px;min-width: 280px;"
               width="100%">
          <tbody>
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                <tr>
                  <td height="20" style="font-size: 0;line-height: 0;height: 20px;"></td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#b2f0a0"
                style="background-color: rgb(0,0,0);border-radius: 8px 8px 0 0;overflow: hidden;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                <tr>
                  <td align="center" style="padding: 40px 15px 12px;">
                    <table border="0" cellpadding="0" cellspacing="0"
                           style="max-width: 520px;border-spacing: 0;" width="100%">
                      <tbody>
                      <tr letteros-hide-value="table-row" style="display: table-row;">
                        <td align="left">
                          <table border="0" cellpadding="0" cellspacing="0"
                                 style="width: 100%;border-spacing: 0;"
                                 >
                            <tbody>
                            <tr>
                              <td align="left">
                                <a href="https://u-project-studio.ru/" style="text-decoration: none;">
                                  <span color="#ff0032" style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 28px;color: #ffffff;text-decoration: none;">
                                    U PROJECT STUDIO
                                  </span>
                                </a>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" class="letteros_mob_fs_36_mr_css_attr"
                            style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 40px;line-height: 58px;font-weight: bold;letter-spacing: -0.01em;padding-top: 24px;">
                          <span color="#ff0032" style="text-decoration: none;color: rgb(255,255,255);">
                            ${title}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td align="left"
                            style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 20px;line-height: 30px;color: #ffffff;padding-top: 12px;">
                          <span style="color: #ffffff;">${subTitle}</span>
                        </td>
                      </tr>
                      <tr>
                        <td align="left"
                            style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 16px;line-height: 30px;color: #ffffff;padding-top: 12px;">
                          <span style="color: #ffffff;">${description}</span>
                        </td>
                      </tr>
                      <tr letteros-hide-value="table-row" style="display: table-row;">
                        <td align="left" style="padding-top: 24px;">
                          <table border="0" cellpadding="0" cellspacing="0"
                                 style="width: 100px;border-spacing: 0;" width="100">
                            <tbody>
                            ${content}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          ${blocks}
          <tr>
            <td align="center" style="padding: 40px 15px;">
              <table border="0" cellpadding="0" cellspacing="0"
                     style="max-width: 520px;border-spacing: 0;" width="100%">
                <tbody>
                <tr>
                  <td align="left" style="padding-bottom: 32px;">
                    <table border="0" cellpadding="0" cellspacing="0"
                           style="width: 100%;max-width: 218px;border-spacing: 0;" width="218">
                      <tbody>
                      <tr>
                        <td align="left">
                          <a href="https://u-project-studio.ru/">
                            <img alt="U PROJECT STUDIO"
                                 border="0"
                                 src="https://u-projectstudio.ru/image/catalog/logo/logo_401.png"
                                 style="display: block;width: 100%;max-width: 218px;text-decoration: none;"
                                 title="U PROJECT STUDIO"
                                 width="218">
                          </a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                      <tr>
                        <td align="left"
                            style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 20px;line-height: 30px;font-weight: bold;padding-bottom: 16px;">
                          <a href="https://business.u-projectstudio.ru/politika"
                             style="color: #000000;text-decoration: none;" target="_blank"
                             rel=" noopener noreferrer"><span style="text-decoration: none;">Политика конфидецальности</span></a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                      <tr>
                        <td align="left" style="width: 110px;" valign="top" width="110">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                              <td align="left"
                                  style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 20px;line-height: 30px;font-weight: bold;">
                                <a href="https://business.u-projectstudio.ru/"
                                   style="color: #B1B3B3;text-decoration: none;"
                                   target="_blank" rel=" noopener noreferrer"><span
                                    style="text-decoration: none;">Сотрудничество</span></a>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </td>
                        <td align="right" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                              <td align="right" style="padding-bottom: 14px;">
                                <table border="0" cellpadding="0" cellspacing="0"
                                       style="max-width: 300px;border-spacing: 0;"
                                       width="100%">
                                  <tbody>
                                  <tr>
                                    <td align="right"
                                        style="width: 20%;padding-left: 10px;"
                                        width="20%">
                                      <table border="0" cellpadding="0"
                                             cellspacing="0"
                                             style="width: 100%;max-width: 28px;border-spacing: 0;"
                                             width="28">
                                        <tbody>
                                        <tr>
                                          <td align="right"><a
                                              href="https://t.me/U_PROJECT_STUDIO"
                                              style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 10px;color: #ECECEC;text-decoration: none;"
                                              target="_blank"
                                              rel=" noopener noreferrer"><img
                                              alt="telegram" border="0"
                                              src="https://u-project-studio.ru/api/files/tg-icon.png"
                                              style="display: block;width: 100%;max-width: 28px;text-decoration: none;"
                                              title="telegram" width="28"></a>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                    <td align="right"
                                        style="width: 20%;padding-left: 10px;"
                                        width="20%">
                                      <table border="0" cellpadding="0"
                                             cellspacing="0"
                                             style="width: 100%;max-width: 28px;border-spacing: 0;"
                                             width="28">
                                        <tbody>
                                        <tr>
                                          <td align="right"><a
                                              href="https://api.whatsapp.com/send?phone=79260305570"
                                              style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 10px;color: #ECECEC;text-decoration: none;"
                                              target="_blank"
                                              rel=" noopener noreferrer"><img
                                              alt="ok" border="0"
                                              src="https://u-project-studio.ru/api/files/ok-icon.png"
                                              style="display: block;width: 100%;max-width: 28px;text-decoration: none;"
                                              width="28" data-title="ok"></a>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                    <td align="right"
                                        style="width: 20%;padding-left: 10px;"
                                        width="20%">
                                      <table border="0" cellpadding="0"
                                             cellspacing="0"
                                             style="width: 100%;max-width: 28px;border-spacing: 0;"
                                             width="28">
                                        <tbody>
                                        <tr>
                                          <td align="right"><a
                                              href="https://vk.com/uprojectstudio"
                                              style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 10px;color: #ECECEC;text-decoration: none;"
                                              target="_blank"
                                              rel=" noopener noreferrer"><img
                                              alt="vk" border="0"
                                              src="https://u-project-studio.ru/api/files/vk-icon.png"
                                              style="display: block;width: 100%;max-width: 28px;text-decoration: none;"
                                              title="vk"
                                              width="28"></a>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                      <tr>
                        <td align="left" width="65%">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                              <td align="left" style="font-size: 0;line-height: 0;"
                                  valign="top">
                                <div style="display: inline-block;vertical-align: top;width: 100%;max-width: 182px;">
                                  <table border="0" cellpadding="0" cellspacing="0"
                                         width="100%">
                                    <tbody>
                                    <tr>
                                      <td align="left"
                                          style="font-size: 14px;line-height: 16px;padding-top: 10px;">
                                        <table border="0" cellpadding="0"
                                               cellspacing="0"
                                               style="width: 100% !important;max-width: 156px !important;border-spacing: 0;"
                                               width="156">
                                          <tbody>
                                          <tr>
                                            <td align="center">
                                              <img
                                                  alt="App Store"
                                                  border="0"
                                                  src="https://u-project-studio.ru/api/files/app-store-icon.png"
                                                  style="display: block;text-decoration: none;width: 100%;height: auto;max-width: 156px;min-width: 138px;"
                                                  title="App Store"
                                                  width="156">
                                            </td>
                                          </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div style="display: inline-block;vertical-align: top;">
                                  <table border="0" cellpadding="0" cellspacing="0"
                                         width="100%">
                                    <tbody>
                                    <tr>
                                      <td align="right"
                                          style="font-size: 14px;line-height: 16px;padding-top: 10px;">
                                        <table border="0" cellpadding="0"
                                               cellspacing="0"
                                               style="width: 100% !important;max-width: 156px !important;border-spacing: 0;"
                                               width="156">
                                          <tbody>
                                          <tr>
                                            <td align="center">
                                              <img
                                                alt="Google play"
                                                border="0"
                                                src="https://u-project-studio.ru/api/files/google-play-icon.png"
                                                style="display: block;text-decoration: none;width: 100%;height: auto;max-width: 156px;min-width: 138px;"
                                                title="Google play"
                                                width="156">
                                            </td>
                                          </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="left"
                      style="font-family: Arial, Tahoma, Helvetica, sans-serif;font-size: 12px;line-height: 18px;color: #B1B3B3;padding-bottom: 8px;">
                     <p style="font-size: 14px;">Ежедневно с 9:00 до 18:00</p>
                     <p style="font-size: 14px;">г. Ростов-на-Дону,Коммунистический проспект, 10</p>
                     <p style="font-size: 14px;">8 (800) 500-22-17; 8 (926) 030-55-70</p>
                     <p style="font-size: 14px;">Интернет магазин парфюмерии от "U PROJECT STUDIO"</p>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                <tr>
                  <td height="20" style="font-size: 0;line-height: 0;height: 20px;"></td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    </tbody>
  </table>
</div>
`;
};
