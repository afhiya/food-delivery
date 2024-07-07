import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const AccordionHome = () => {
    return (
      <div className="flex flex-row gap-5 p-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Zutto food?</AccordionTrigger>
            <AccordionContent>
              Zutto Food is a food delivery service that offers a wide variety
              of meals from the best restaurants in your city.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How do I order food from Zutto Food?
            </AccordionTrigger>
            <AccordionContent>
              To order food, you can visit the Zutto Food app from your browser,
              create an account, and start browsing the various food options.
              Select the food you want, add it to your cart, and make the
              payment through the app.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What payment methods are accepted by Zutto Food?
            </AccordionTrigger>
            <AccordionContent>
              Zutto Food accepts various payment methods, including credit
              cards, debit cards, and digital payments such as with Qris.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Is there a delivery fee for Zutto Food?
            </AccordionTrigger>
            <AccordionContent>
              Yes, Zutto Food charges a delivery fee that varies depending on
              the delivery location and the restaurant you choose. Delivery fee
              information will be displayed when you place your order.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What if there is an issue with my order?
            </AccordionTrigger>
            <AccordionContent>
              If you experience any issues with your order, you can contact
              Zutto Food customer service through our app or website. We will be
              happy to assist you in resolving the issue
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is Zutto Food available in all cities?</AccordionTrigger>
            <AccordionContent>
              Currently, Zutto Food is available in several major cities. We are continuously expanding our service coverage to serve more customers.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
}

export default AccordionHome