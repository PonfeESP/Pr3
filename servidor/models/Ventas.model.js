import {Model} from 'objection';
export default class Ventas extends Model {
    
    // Nombre de la tabla
    static tableName = 'sales';

    // Clave primaria
    static idColumn = 'id';

    // Esquema de datos
    static jsonSchema = {
        type: 'object',
        properties: {
            id:{
                type: 'string'
            },
            amount:{
                type: 'string'
            },
            client: {
                type: 'string'
            },
            event: {
                type: 'string'
            }
        }
    }
}