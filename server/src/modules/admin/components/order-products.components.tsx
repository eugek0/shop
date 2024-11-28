import { flat, BasePropertyProps } from 'adminjs';
import React from 'react';
import {
  Box,
  FormGroup,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
} from '@adminjs/design-system';

const OrderProducts = (props: BasePropertyProps) => {
  const { products } = flat.unflatten(props.record.params);

  const baseUrl = `${window.location.origin}/admin/resources`;

  const getImageUrl = (name) => `https://u-project-studio.ru/api/files/${name}`;

  const getUrl = (name: string, id: string) =>
    `${baseUrl}/${name}/records/${id}/show`;

  return (
    <FormGroup mb={24}>
      <Label>Товары в заказе</Label>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{'Название'}</TableCell>
              <TableCell>{'Количество'}</TableCell>
              <TableCell>{'Стоимость, руб'}</TableCell>
              <TableCell>{'Стоимость со скидкой, руб'}</TableCell>
              <TableCell>{'Скидка, руб'}</TableCell>
              <TableCell>{'Изображение'}</TableCell>
              <TableCell>{'Объем'}</TableCell>
              <TableCell>{'Для кого'}</TableCell>
              <TableCell>{'Мотив'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!products.length && (
              <TableRow>
                <TableCell colSpan={10} style={{ textAlign: 'center' }}>
                  Товаров нет
                </TableCell>
              </TableRow>
            )}
            {products.length > 0 &&
              products.map(
                ({
                  count,
                  price,
                  priceDiscount,
                  priceWithDiscount,
                  product,
                }) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Link href={getUrl('Товары', product.id)}>
                        {product.title}
                      </Link>
                    </TableCell>
                    <TableCell>{count}</TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>{priceWithDiscount || price}</TableCell>
                    <TableCell>{priceDiscount || 0}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          height: '100px',
                          width: '100px',
                          backgroundColor: '#F2F2F2',
                        }}
                      >
                        <img
                          src={getImageUrl(product.preview)}
                          style={{
                            height: '100px',
                            width: '100px',
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link href={getUrl('Объемы', product.volume.id)}>
                        {product.volume.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={getUrl('Для кого', product.gender.id)}>
                        {product.gender.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={getUrl('Мотивы', product.motive.id)}>
                        {product.motive.title}
                      </Link>
                    </TableCell>
                  </TableRow>
                ),
              )}
          </TableBody>
        </Table>
      </Box>
    </FormGroup>
  );
};

export default OrderProducts;
