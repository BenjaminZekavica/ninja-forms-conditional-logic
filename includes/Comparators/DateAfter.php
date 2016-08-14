<?php

class NF_ConditionalLogic_Comparators_DateAfter implements NF_ConditionalLogic_Comparator
{
    public function compare( $comparison, $value )
    {
        return ( strtotime( $comparison ) > strtotime( $value ) );
    }
}