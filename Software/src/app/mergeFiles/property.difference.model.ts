import { Property } from "./property.model";

export class PropertyDifference {

    public equal: boolean = false;
    public onlyLeft: boolean = false;
    public onlyRight: boolean = false;
    public isBoth: boolean = false;
    public choosed: Property;

    constructor(
        public name: string,
        public leftProperty?: Property,
        public rightProperty?: Property
    ) {



        if ( leftProperty == null && rightProperty == null ) {
            throw new Error( "Can not compare empty properties" );
        }

        this.onlyRight = ( leftProperty == null && rightProperty != null );
        this.onlyLeft = ( leftProperty != null && rightProperty == null );
        this.isBoth = ( leftProperty != null && rightProperty != null );

        if ( leftProperty != null && rightProperty != null ) {
            this.equal = this.compare( leftProperty, rightProperty );
        }

        if ( leftProperty != null && name !== leftProperty.name || rightProperty != null && name !== rightProperty.name ) {
            throw new Error( "Can not compare properties with different names" );
        }
    }

    private compare( leftProperty: Property, rightProperty: Property ): boolean {
        return ( leftProperty.value === rightProperty.value );
    }
}