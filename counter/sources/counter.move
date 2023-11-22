module 0xcbc0ac12c077e960cd789ac576b11683ba6f0ca2cab13f0b3057f846e916f04d::counter
{
        use std::signer;

    struct CountHolder has key
    {
        count: u64
    }

    public fun get_count(addr: address): u64 acquires CountHolder
    {
        assert!(exists<CountHolder>(addr),0);
        *&borrow_global<CountHolder>(addr).count
    }

    public  entry fun bump(account: signer)
    acquires CountHolder
    {
        let addr = signer::address_of(&account);
         if(!exists<CountHolder>(addr))
         {
            move_to(&account, CountHolder {
                count: 0
            })
            
         }

         else {
            let old_count = borrow_global_mut<CountHolder>(addr);
            old_count.count = old_count.count + 1;
         }
        
          
    }

}