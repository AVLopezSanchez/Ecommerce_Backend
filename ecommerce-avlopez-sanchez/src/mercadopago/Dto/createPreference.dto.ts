export class CreatePreferenceDto {
  readonly title: string;
  readonly quantity: number;
  readonly unit_price: number;
  readonly currency_id: string = 'ARS';
  readonly description?: string;
}
