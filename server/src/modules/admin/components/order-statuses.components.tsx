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

const OrderStatuses = (props: BasePropertyProps) => {
  const { statuses } = flat.unflatten(props.record.params);

  const baseUrl = `${window.location.origin}/admin/resources`;

  const getUrl = (name: string, id: string) =>
    `${baseUrl}/${name}/records/${id}/show`;

  const getDate = (isoDate: string) => {
    const date = new Date(isoDate);

    return date.toLocaleString('ru-RU');
  };

  return (
    <FormGroup mb={24}>
      <Label>История изменения статусов</Label>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{'Название'}</TableCell>
              <TableCell>{'Дата изменения'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!statuses.length && (
              <TableRow>
                <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                  Истории нет
                </TableCell>
              </TableRow>
            )}
            {statuses.length > 0 &&
              statuses.map(({ id, status, createdAt }) => (
                <TableRow key={id}>
                  <TableCell>
                    <Link href={getUrl('Статусы', status.id)}>
                      {status.title}
                    </Link>
                  </TableCell>
                  <TableCell>{getDate(createdAt)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </FormGroup>
  );
};

export default OrderStatuses;
