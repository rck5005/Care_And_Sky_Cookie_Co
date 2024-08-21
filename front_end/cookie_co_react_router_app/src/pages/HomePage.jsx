import React from 'react'
import { useOutletContext } from 'react-router-dom'

function HomePage() {
  const {user} = useOutletContext()

  return (
    <>
      <div>Welcome to Sky and Cookie Co, {user}!</div>
      <h3>Explore and Create Your Sweetest Dreams</h3>

      <p>
          🌟 **Discover More About Us:** Dive into our <a href="about/">About Page</a> to learn our story and engage with our very own AI. Got questions? Our AI is ready to chat and provide you with the answers you seek!
      </p>

      <p>
          🍪 **Your Cookie Haven:** Check out your personalized space where you can:
          <ul>
            <li>- <a href="creations/favorites/">**View Your Favorites:**</a> Browse through all the cookies you've marked as favorites.
            </li>
            <li>- <a href="creations/all/">**Explore All Our Cookies:**</a> Discover every delightful cookie we have available, handpicked by us, the sellers.
            </li>
            <li>- <a href="creations/mine/">**Revisit Your Creations:**</a> See all the incredible cookie creations you've designed!
            </li>
          </ul>
      </p>

      <p>
          🎨 <a href="makecreation/">**Craft Your Masterpiece:**</a> Let your creativity shine by making your own cookie creation! Choose from an array of flavors, cookie cutters, toppings, and decorations. Once you've perfected your creation, give it a name and write a description that captures its essence.
      </p>

      <p>
          🛍️ **Browse Our Collection:** Immerse yourself in our unique offerings:
          <ul>
            <li>- <a href="variations/flavors/">**Flavors Page:**</a> Find your favorite flavors, all in one place.
            </li>
            <li>- <a href="variations/cookiecutters/">**Cookie Cutter Page:**</a> Peruse our selection of fun and creative cookie cutters.
            </li>
            <li>- <a href="variations/toppings/">**Toppings Page:**</a> Add that perfect touch with our variety of toppings.
            </li>
            <li>- <a href="variations/decorations/">**Decorations Page:**</a> Choose from a wide range of decorations to make your cookie truly stand out.
            </li>
            Add any item to your creation with just a click!
          </ul>
      </p>

      <p>
         🔧 **Manage Your Account:** On the <a href="account/">Account Page</a>, you can view your current information, update your display name, address, change your password, subscribe/unsubscribe from our newsletter via MailChimp, and even delete your account if needed.
      </p>

    </>
  )
}

export default HomePage